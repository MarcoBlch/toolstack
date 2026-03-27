'use client'
import HomeContent from '@/components/HomeContent'
import { HOME_DATA } from '@/lib/homeData'

export default function HomeClient() {
  return <HomeContent lang="en" {...HOME_DATA.en} />
}
