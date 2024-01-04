"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "../../hooks/useSearchModal";
import Modal from "./Modal";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../../components/inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEP {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}



const SearchModal = () => {

    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [step , setStep] = useState(STEP.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })
    const [location, setLocation] = useState<CountrySelectValue>()

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }),[location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    },[]);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    },[]);

    const onSubmit = useCallback(() => {
        if(step !== STEP.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if(params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            bathroomCount,
            roomCount
        };

        if(dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEP.LOCATION);
        searchModal.onClose();

        router.push(url);
    },[
        step,
        searchModal,
        location,
        router,
        guestCount,
        bathroomCount,
        roomCount,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(() => {
        if(step === STEP.INFO) {
            return 'Search';
        }
        return 'Next';
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEP.LOCATION) {
            return undefined;
        }
        return 'Back';
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Where do you wanna go?"
                subtitle="Find the perfect location"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if(step === STEP.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free"
                />
                <Calender
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEP.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="More information"
              subtitle="Find your perfect place!"
            />
            <Counter 
              onChange={(value) => setGuestCount(value)}
              value={guestCount}
              title="Guests" 
              subtitle="How many guests are coming?"
            />
            <hr />
            <Counter 
              onChange={(value) => setRoomCount(value)}
              value={roomCount}
              title="Rooms" 
              subtitle="How many rooms do you need?"
            />        
            <hr />
            <Counter 
              onChange={(value) => {
                setBathroomCount(value)
              }}
              value={bathroomCount}
              title="Bathrooms"
              subtitle="How many bahtrooms do you need?"
            />
          </div>
        )
      }
    
    return ( 
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={step === STEP.LOCATION ? undefined : secondaryActionLabel}
            secondaryAction={step === STEP.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
     );
}
 
export default SearchModal;