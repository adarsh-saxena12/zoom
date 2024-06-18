import { cn } from '@/lib/utils';
import { CallControls, CallParticipantListing, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
  

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal')
    
    const [layout, setLayout] = useState('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);

    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();
    if(callingState != CallingState.JOINED) return <Loader />;


    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left"/>    
            default:
                return <SpeakerLayout participantsBarPosition="right"/>        

        }
    }

    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex size-full items-center justify-center'>
               <div className='flex size-full max-w-[1000px] items-center'>
                 <CallLayout />
               </div>

               <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants})}>
               <CallParticipantsList
                onClose={() => setShowParticipants(false)}
               />
               </div>
            </div>

            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
            <CallControls />

        <DropdownMenu>
            <div className='flex items-center'>
             <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#1e2224] px-4 py-2 hover:bg-[#26292d]'>
               <LayoutList 
               size={20}
               className='text-white'
               />
             </DropdownMenuTrigger>
            </div>
          
          <DropdownMenuContent className='border-none bg-[#191b1c] text-white mb-2 rounded-2xl p-2'>
              {
              ['Grid', 'Speaker Left', 'Speaker Right'].map((item, index) =>(
                <div 
                className=''
                key={index}
                >
                 <DropdownMenuItem className='cursor-pointer hover:bg-[#202123] rounded-xl p-2'
                 onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType)
                 }}
                 >
                    {item}
                 </DropdownMenuItem>
                 <DropdownMenuSeparator className='border-dark-1'/>
                </div>
              ))
              
              }
             
            </DropdownMenuContent>
          </DropdownMenu>

             <CallStatsButton />
             <button onClick={() => setShowParticipants((prev) => !prev)}>
              <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <User size={20} className='text-white'/>
              </div>
             </button>
             {
                !isPersonalRoom && <EndCallButton />
             }
            </div>
        </section>
    );
};

export default MeetingRoom;