import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { SONGS } from "../../Constants/Fetch"
import type { OutletContextType, SearchTypes, selectedSongs, Songtypes } from "../../types"
import { useOutletContext } from "react-router-dom"
import { motion } from 'framer-motion'


const NewTracksSub = () => {
  const { t } = useTranslation()
  const [playlists, setPlaylists] = useState<Songtypes[]>([])
  const {setCurrentSong} = useOutletContext<OutletContextType>()


  useEffect(() => {
    const fetchData = async () => {
      const res = await SONGS("kylie", 5);
      if (res?.data) {
        setPlaylists(res.data.results)
      }
    }
    fetchData()
  }, [])

  const handlePlay = (song: SearchTypes) => {
      const selected: selectedSongs = {
        artist: song.artists?.all[0].name,
        title: song.title || song.name,
        audio: song.downloadUrl[4].url,
        id: song.id,
        image: song.image?.[2]?.url || ""
      };
  
      setCurrentSong(selected)
    }


  
  
  return (
    <section className="w-full">
      <div className="flex justify-between items-center max-sm:bg-cream/40 max-sm:p-1 rounded-[5px]">
        <h1 className="text-white text-2xl max-sm:text-lg">{t('newTracks')}</h1>
      </div>
      <div className="xl:gap-10 max-sm:gap-35 min-md:gap-55 p-5 grid grid-cols-5 overflow-x-scroll">
        {playlists.map((tracks) => (
          <motion.img 
          onClick={()=>handlePlay(tracks)}
          whileHover={{scale:1.05}}
          className="xl:w-[400px] xl:h-[240px] bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer max-sm:max-h-32 max-sm:max-w-32 md:min-w-45 md:min-h-45" 
          key={tracks.id} 
          src={tracks.image[2].url} 
          alt="songImage" />
        ))}

      </div>
    </section>
  )
}

export default NewTracksSub