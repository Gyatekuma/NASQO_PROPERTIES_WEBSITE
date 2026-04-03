import React from 'react'
import Image from './OptimizedImage'

interface SectionTagsProps {
  name: string;
  imageSrc: string;
  className?: string
  header: string;
  subtext?: string
}

const SectionTags: React.FC<SectionTagsProps> = ({ name, imageSrc, className = '', header, subtext }) => {
  return (
    <div className={`main_container flex flex-col itemx-center gap-[3%] 2xl:gap-1 my-[10%] xl:my-[2%] md:w-[85%] xl:w-[94%] 2xl:w-[100%] ${className}`}>
      <div className="tag-text-container flex items-center gap-3 xl:w-[200]">
        <Image
        src={imageSrc}
        alt=""
        width={20}
        height={20}
        className="w-[11] md:w-[13] lg:w-[14] xl:w-[12] 2xl:w-[12] h-auto"
        aria-hidden
        />
        <p className='font-bricolage capitalize font-semibold'>{name}</p>

      </div>
      <h2 className="header font-bricolage md:text-3xl text-2xl lg:text-4xl xl:text-3xl 2xl:text-4xl font-semibold tracking-tighter leading-7 lg:leading-8 xl:leading-8 2xl:leading-10 py-[3%] xl:py-[2%]">
        {header}
      </h2>
      <div className="subtext md:w-full xl:w-[90%] 2xl:w-full md:text-lg lg:text-lg xl:text-sm 2xl:text-base font-mona text-neutral-500 leading-5 md:leading-6 xl:leading-5">
        {subtext}
      </div>
    </div>
  )
}

export default SectionTags
