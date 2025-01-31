'use client'
import { useSearchParams } from 'next/navigation'
import Form from "./form"

export default function FormWrapper({ locale }) {
  const inviteId = useSearchParams().get('inviteId');
  
  return <Form locale={locale} inviteId={inviteId} />;
}
