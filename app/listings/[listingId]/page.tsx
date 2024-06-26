import getCurrentUser from "../../actions/getCurrentUser";
import getListingById from "../../actions/getListingById";
import getReservations from "../../actions/getReservations";
import ClientOnly from "../../components/ClientOnly";
import EmptyState from "../../components/EmptyState";
import ListingClient from "./ListingClient";


interface IParams {
    listingId?: string;
}


const ListingPage = async ({ params }: { params: { listingId: string } }) => {

    const listing = await getListingById(params);
    const reversations = await getReservations({ listingId: params.listingId });
    const currentUser = await getCurrentUser();

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    } 

    
    

    return ( 
        <ClientOnly >
           <ListingClient
            listing={listing}
            // @ts-ignore
            reservations={reversations}
             // @ts-ignore
            currentUser={currentUser}
           />
        </ClientOnly>
     );
}
 
export default ListingPage;