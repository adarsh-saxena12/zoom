"use client";

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';

// [id] -> dynamic route
// here we are grabing params to know which meeting room we are in 
const Meeting = ({ params: { id } }: { params: { id: string}}) => {

    // grab currently authenticated user
    const { user, isLoaded } = useUser();

    // is audio/video setup completed
    const [isSetupComplete, setIsSetupComplete] = useState(false); 
    const { call, isCallLoading } = useGetCallById(id);

    if(!isLoaded || isCallLoading) return <Loader />;

    return (
        <main className='h-screen w-full'>
          <StreamCall call={call}>
            <StreamTheme>
              {
                !isSetupComplete ? (
                    <MeetingSetup 
                    setIsSetupComplete={setIsSetupComplete}
                    />
                ) : (
                    <MeetingRoom />
                )
              }
            </StreamTheme>
          </StreamCall>
        </main>
    );
};

export default Meeting;
