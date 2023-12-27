'use client';

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "../../types";
import { useMemo } from "react";
import { categories } from "../../components/navbar/Categories";
import Container from "../../components/Container";
import ListingHead from "../../components/Listing/ListingHead";
import ListingInfo from "../../components/Listing/ListingInfo";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}


const ListingClient = ({
    reservations,
    listing,
    currentUser
}: ListingClientProps) => {

    const category = useMemo(() => {
        return categories.find((items) => 
         items.label === listing.category);
     }, [listing.category]); 

    


    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;