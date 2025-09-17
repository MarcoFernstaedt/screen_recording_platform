import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
    return (
        <header className='header'>
            <section className='header-container'>
                <div className='details'>
                    {userImg && (
                        <Image className='rounded-full' src={userImg || '/assets/images/dummy.jpg'} alt='user avatar' width={66} height={66} />
                    )}

                    <article>
                        <p>{subHeader}</p>
                        <h1>{title}</h1>
                    </article>
                </div>

                <aside>
                    <Link href='/upload'>
                        <Image src='/assets/icons/upload.svg' alt='upload' width={16} height={16} />
                        <span>Upload a video</span>
                    </Link>

                    <div className="record">
                        <button className='primary-btn'>
                            <Image src='/assets/icons/record.svg' alt='record' width={16} height={16} />
                            <span>Record a video</span>
                        </button>
                    </div>
                </aside>
            </section>

            <section className='search-filter'>
                <div className='search'>
                    <input
                        type='text'
                        placeholder='Search for videos, tags and folders...'
                    />
                    <Image src='/assets/icons/search.svg' alt='search' width={16} height={16} />
                </div>
                {'<DropdownList />'}
            </section>
        </header>
    )
}

export default Header