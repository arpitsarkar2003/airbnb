"use client";

import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { SafeUser } from "../../types";
import Categories from "./Categories";
import { getListing } from "../../actions/getListing";



interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar = ({currentUser}: NavbarProps) => {

  
  return (
    <div className="fixed w-full bg-white shadow-sm z-[99999]">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between flex-row gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
        <Categories />
      </div>
    </div>
  )
}
export default Navbar

// export default async function Navbar({ currentUser }: Readonly<NavbarProps>) {

//   const listings = await getListing();

//   return (
//     <div className="fixed w-full bg-white shadow-sm z-[99999]">
//       <div className="py-4 border-b-[1px]">
//         <Container>
//           <div className="flex items-center justify-between flex-row gap-3 md:gap-0">
//             <Logo />
//             {listings.map((listing) => (
//               <Search
//                 key={listing.id}
//                 data={listing}
//               />
//             ))}
//             <UserMenu currentUser={currentUser} />
//           </div>
//         </Container>
//         <Categories />
//       </div>
//     </div>
//   )
// }


// "use client";

// import React, { useEffect, useState } from 'react';
// import Container from '../Container';
// import Logo from './Logo';
// import Search from './Search';
// import UserMenu from './UserMenu';
// import { SafeUser } from '../../types';
// import Categories from './Categories';
// import { getListing } from '../../actions/getListing';
// import { Listing } from '@prisma/client';

// interface NavbarProps {
//   currentUser: SafeUser | null;
// }

// export default function Navbar({ currentUser }: Readonly<NavbarProps>) {
//   const [listings, setListings] = useState<Listing[]>([]);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const fetchedListings = await getListing();

//         // Convert createdAt from string to Date
//         const processedListings = fetchedListings.map((listing) => ({
//           ...listing,
//           createdAt: new Date(listing.createdAt),
//         }));

//         setListings(processedListings);
//       } catch (error) {
//         console.error('Error fetching listings:', error);
//       }
//     };

//     fetchListings();
//   }, []);

//   console.log('Listings length:', listings.length);

//   return (
//     <div className="fixed w-full bg-white shadow-sm z-[99999]">
//       <div className="py-4 border-b-[1px]">
//         <Container>
//           <div className="flex items-center justify-between flex-row gap-3 md:gap-0">
//             <Logo />
//             {listings.map((listing) => (
//               <Search key={listing.id} data={listing} />
//             ))}
//             <UserMenu currentUser={currentUser} />
//           </div>
//         </Container>
//         <Categories />
//       </div>
//     </div>
//   );
// }
