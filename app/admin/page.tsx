// admin/page.tsx

import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect(process.env.SANITY_STUDIO_URL || 'http://localhost:3333'); 
  return null;
}