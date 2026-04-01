import Image from './OptimizedImage';
import React from 'react'
import Button from './button'

interface servicesCardProps {
    id: string;
    imageSrc: string;
    title:string;
    subtext:string;
    href?: string;
}

const ServicesCard:React.FC<servicesCardProps> = ({ id, imageSrc, title, subtext, href = "/Services" }) => {
  return (
    <div className='services_card_container h-[100%] border border-neutral-300 rounded-3xl'>
      <div className="image_container relative overflow-hidden w-full h-[30vh] md:h-[20vh] xl:h-[30vh] 2xl:h-[30vh] z-0 rounded-3xl flex items-center justify-center">
        <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className='w-full h-full object-cover z-10'
        />

        <div className="overlay inset-0 absolute bg-black/50 z-10"/>
        <div className="title absolute bottom-[10%] left-0 right-0 z-20 px-[5%] text-center capitalize font-bricolage font-semibold text-white text-xl md:text-2xl xl:text-lg 2xl:text-xl">
          {title}
        </div>
      </div>
    <div className="subtext_button_container p-[6%] xl:p-[5%]">
      <div className="subtext font-mona text-base xl:text-xs 2xl:text-sm leading-5 line-clamp-3">
        {subtext}
      </div>

      <div className="button_container mt-[6%]">
        <Button text="Learn more" variants="primary" href={href} className="min-w-[180px] w-auto shrink-0" />
      </div>
    </div>
    </div>
  )
}

export default ServicesCard
