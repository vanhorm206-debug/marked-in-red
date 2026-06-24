export interface Resource {
  name: string
  url: string
  description: string
}

export interface ResourceCategory {
  category: string
  links: Resource[]
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    category: 'Official databases & government offices',
    links: [
      { name: 'NamUs (National Missing and Unidentified Persons System)', url: 'https://namus.nij.ojp.gov/', description: 'US DOJ-funded national database of missing, unidentified, and unclaimed persons cases.' },
      { name: "Canada's Missing (RCMP National Centre for Missing Persons)", url: 'https://canadasmissing.ca/', description: 'RCMP public database and resource hub for missing persons and unidentified remains in Canada.' },
      { name: 'BIA Missing & Murdered Unit (MMU)', url: 'https://www.bia.gov/service/mmu', description: 'US Bureau of Indian Affairs unit investigating cases involving American Indians and Alaska Natives.' },
      { name: 'Not Invisible Act Commission', url: 'https://www.bia.gov/service/not-invisible-act-commission', description: 'Federal advisory commission issuing recommendations to reduce violence and missing or murder cases affecting Native Americans and Alaska Natives.' },
      { name: 'Minnesota Missing & Murdered Indigenous Relatives (MMIR) Office', url: 'https://dps.mn.gov/divisions/ojp/offices-missing-murdered/mmir-office', description: 'First-in-the-nation state office working to reduce and end violence against Indigenous people in Minnesota.' },
    ],
  },
  {
    category: 'Advocacy & resource organizations',
    links: [
      { name: "National Indigenous Women's Resource Center (NIWRC)", url: 'https://www.niwrc.org/', description: 'National Native nonprofit providing resources and policy advocacy to end violence against Native women.' },
      { name: 'Sovereign Bodies Institute', url: 'https://www.sovereign-bodies.org/', description: 'Indigenous-led research organization building data on gender and sexual violence against Native people.' },
      { name: 'Urban Indian Health Institute (UIHI)', url: 'https://www.uihi.org/', description: 'Tribal epidemiology center producing public-health data and research on urban Native communities.' },
      { name: 'UIHI: Missing and Murdered Indigenous Women & Girls report', url: 'https://www.uihi.org/resources/missing-and-murdered-indigenous-women-girls/', description: "Landing page for UIHI's study of MMIWG cases across 71 US urban cities." },
      { name: 'Coalition to Stop Violence Against Native Women (CSVANW)', url: 'https://csvanw.org/', description: 'New Mexico-based coalition working to end violence against Native women and children.' },
      { name: "Native Women's Wilderness: MMIW", url: 'https://www.nativewomenswilderness.org/mmiw', description: "Educational MMIW awareness resource and reading list from a Native women's outdoors organization." },
      { name: 'StrongHearts Native Helpline', url: 'https://strongheartshelpline.org/', description: 'Confidential, culturally appropriate domestic and dating violence helpline for Native communities.' },
    ],
  },
  {
    category: 'Landmark reports & inquiries',
    links: [
      { name: "Canada's National Inquiry into MMIWG", url: 'https://www.mmiwg-ffada.ca/', description: "Official site of Canada's National Inquiry into Missing and Murdered Indigenous Women and Girls." },
      { name: 'Reclaiming Power and Place: Final Report', url: 'https://www.mmiwg-ffada.ca/final-report/', description: "Permanent landing page for the National Inquiry's final report and supplementary volumes." },
    ],
  },
  {
    category: 'News & journalism',
    links: [
      { name: 'ICT (Indian Country Today)', url: 'https://ictnews.org/', description: 'Independent, Indigenous-led national news organization covering Native affairs including MMIW.' },
    ],
  },
]
