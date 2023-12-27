import getCurrentUser from "./actions/getCurrentUser";
import { getListing } from "./actions/getListing";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/Listing/ListingCard";

export default async function Home() {

  const listings = await getListing();
  const currentUser = await getCurrentUser();


  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"> 
        {listings.map((listing) => (
            <ListingCard
            // @ts-ignore
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}