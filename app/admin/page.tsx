// admin/page.tsx

// import React from 'react';

// export default function AdminPage() {
//   return (
//     <div className="relative w-screen h-screen overflow-hidden">
//       <iframe 
//         src="http://localhost:3333" 
//         className="absolute top-0 left-0 w-full h-full border-none z-50"
//         title="Tetras Admin Studio"
//       />
//     </div>
//   );
// }

import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect(process.env.SANITY_STUDIO_URL || 'http://localhost:3333'); 
  return null;
}