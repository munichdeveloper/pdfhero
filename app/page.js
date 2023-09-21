import Tile from '@/components/Tile';
import apps from './apps.json';
import React from 'react';
import { Separator } from "@/components/ui/separator"
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <div className='my-3 md:my-8'>
        <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          PDF hero.
        </h1>
        <h2 className="text-center scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Awesome PDF file processing.
        </h2>
      </div>
      <div className='my-3 md:my-8'>
        <Separator />
      </div>
      <div>
        <div className='flex m-3 md:m-5'>
          <div className='flex items-center max-w-xs md:max-w-sm'>
            <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
              Awesome data extraction from your PDF files.
            </h3>
          </div>
          <div className='mx-3 md:mx-8'>
            <Separator orientation="vertical" />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {
              apps.data_extraction.map(app =>
                <Tile key={app.name}
                  displayName={app.displayName}
                  title={app.title}
                  category={app.category}
                  prompt={app.prompt}
                  buttonText="Start Extraction"
                  description={app.description}
                ></Tile>
              )
            }
          </div>
        </div>
      </div>
      <div className='my-3 md:my-8'>
        <Separator />
      </div>
      <div>
        <div className='flex m-3 md:m-5'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {
              apps.pdf_editing.map(app =>
                <Tile key={app.name}
                  displayName={app.displayName}
                  title={app.title}
                  category={app.category}
                  prompt={app.prompt}
                  buttonText="Start Editing"
                  description={app.description}
                ></Tile>
              )
            }
          </div>
          <div className='mx-3 md:mx-8'>
            <Separator orientation="vertical" />
          </div>
          <div className='flex items-center max-w-xs md:max-w-sm'>
            <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
              Awesome text editing of your PDF files.
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
