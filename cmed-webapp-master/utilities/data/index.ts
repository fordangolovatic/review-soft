const Residents = [
  {
    id: 1,
    name: 'testName',
  },
];

const Doctors = {
  title: 'Doctors',
  placeholder: 'Chose a speciality',
  items: [
    {
      id: 1,
      label: 'Attending',
      value: 'attending',
    },
    {
      id: 2,
      label: 'Paramedic',
      value: 'paramedic',
    },
    {
      id: 3,
      label: 'Surgeon',
      value: 'surgeon',
    },
    {
      id: 4,
      label: 'Nurse',
      value: 'nurse',
    },
    {
      id: 5,
      label: 'ENT doctor.',
      value: 'entdoctor',
    },
    {
      id: 6,
      label: 'Pharmacist',
      value: 'pharmacist',
    },
  ],
};

const Specialities = {
  title: 'Specialities',
  placeholder: 'Chose a speciality',
  items: [
    {
      label: 'Radiology',
      value: 'radiology',
      id: 1,
    },
    {
      label: 'Rheumatology',
      value: 'rheumatology',
      id: 2,
    },
    {
      label: 'Urology',
      value: 'urology',
      id: 3,
    },
    {
      label: 'Oncology',
      value: 'oncology',
      id: 4,
    },
    {
      label: 'Nephrology',
      value: 'nephrology',
      id: 5,
    },
    {
      label: 'Otolarynology',
      value: 'otolarynology',
      id: 6,
    },
    {
      label: 'Allergy',
      value: 'allergy',
      id: 7,
    },
    {
      label: 'Immunology',
      value: 'immunology',
      id: 8,
    },
    {
      label: 'Hematology',
      value: 'hematology',
      id: 9,
    },
    {
      label: 'Oncology',
      value: 'oncology',
      id: 10,
    },
    {
      label: 'Geriatrics',
      value: 'geriatrics',
      id: 11,
    },
    {
      label: 'Pulmonology',
      value: 'pulmonology',
      id: 12,
    },
    {
      label: 'Psychology',
      value: 'psychology',
      id: 13,
    },
    {
      label: 'Dermatology',
      value: 'dermatology',
      id: 14,
    },
  ],
};

const Language = {
  title: 'Language',
  placeholder: 'Your doctor speak',
  items: [
    {
      id: 1,
      label: 'German',
      value: 'German',
    },
    {
      id: 2,
      label: 'Russian',
      value: 'Russian',
    },
    {
      id: 3,
      label: 'Ukrainian',
      value: 'Ukrainian',
    },
    {
      id: 4,
      label: 'Arabic',
      value: 'Arabic',
    },
    {
      id: 5,
      label: 'French',
      value: 'French',
    },
    {
      id: 6,
      label: 'Spanish',
      value: 'Spanish',
    },
    {
      id: 7,
      label: 'Serbian',
      value: 'Serbian',
    },
    {
      id: 8,
      label: 'Turkish',
      value: 'Turkish',
    },
    {
      id: 9,
      label: 'Italian',
      value: 'Italian',
    },
    {
      id: 10,
      label: 'Chinese',
      value: 'Chinese',
    },
  ],
};

const Country = {
  title: 'Country',
  placeholder: 'Your doctor from',
  items: [
    {
      id: 1,
      label: 'German',
      value: 'German',
      placeholder: 'Your doctor from',
      icon: 'de',
    },
    {
      id: 2,
      label: 'France',
      value: 'France',
      placeholder: 'Your doctor from',
      icon: 'fr',
    },
    {
      id: 3,
      label: 'Australia',
      value: 'Australia',
      placeholder: 'Your doctor from',
      icon: 'at',
    },
  ],
};

const Departments = [
  {
    id: 1,
    name: 'Gynecology',
    path: 'gynecology',
    img: 'http://ginecologie-brasov.ro/files/dynamicContent/sites/zdtmxm/images/ro/webpage_10/l5ky88b3/element_239/1/CABINET-MEDICAL-DE-OBSTETRICA-GINECOLOGIE-TUDORACHE-IOANA-TEODORA.jpg',
  },
  {
    id: 2,
    name: 'Dermatology',
    path: 'dermatology',
    img: 'https://www.marshfieldclinic.org/imagecatalog/Division%20of%20Education/Dermatology-Residents.jpg',
  },
  {
    id: 3,
    name: 'Gastrology',
    path: 'gastrology',
    img: 'https://www.shayonahospital.org/images/gastrology.jpg',
  },
  {
    id: 4,
    name: 'Neurology',
    path: 'neurology',
    img: 'https://www.woosterhospital.org/wp-content/uploads/sites/210/2018/12/neurologyCONTENT1.jpg',
  },
  {
    id: 5,
    name: 'Urology',
    path: 'urology',
    img: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/286/286276/urologist.jpg',
  },
  {
    id: 6,
    name: 'Pediatrics',
    path: 'pediatrics',
    img: 'https://www.news-medical.net/image.axd?picture=2014%2F7%2F147059167-620x480.jpg',
  },
  {
    id: 7,
    name: 'Endocrinology',
    path: 'endocrinology',
    img: 'https://blog.amopportunities.org/wp-content/uploads/2020/07/endocrinology-specialty.jpg',
  },
  {
    id: 8,
    name: 'General Medicine',
    path: 'general-medicine',
    img: 'https://sarafhospital.in/wp-content/uploads/2020/06/generalmedicine.jpg',
  },
];

const defaultWorksCardValues = [
  {
    id: 1,
    title: 'Consultations',
    steps: [
      {
        id: 1,
        title: 'Register',
        step: '01',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: '/images/works/1.png',
        overlay:
          'linear-gradient(180deg, rgba(135, 195, 143, 0) 0%, rgba(135, 195, 143, 0.5) 71.87%)',
        hoverOverlay: '#87C38F',
      },
      {
        id: 2,
        title: 'Enter your information',
        step: '02',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: '/images/works/2.png',
        overlay:
          'linear-gradient(180deg, rgba(76, 164, 88, 0) 0%, rgba(76, 164, 88, 0.5) 64.58%)',
        hoverOverlay: '#4CA458',
      },
      {
        id: 3,
        title: 'Select the department',
        step: '03',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: '/images/works/3.png',
        overlay:
          'linear-gradient(180deg, rgba(63, 142, 95, 0) 0%, rgba(63, 142, 95, 0.5) 64.58%)',
        hoverOverlay: '#3F8E5F',
      },
      {
        id: 4,
        title: 'Select the doctor',
        step: '04',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: '/images/works/4.png',
        overlay:
          'linear-gradient(180deg, rgba(34, 111, 84, 0) 0%, rgba(34, 111, 84, 0.5) 62.5%)',
        hoverOverlay: '#226F54',
      },
      // {
      //   id: 5,
      //   title: 'Enjoy the meeting and the result',
      //   step: '05',
      //   text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      //   img: '/images/works/5.png',
      //   overlay:
      //     'linear-gradient(180deg, rgba(15, 86, 61, 0) 0%, rgba(15, 86, 61, 0.5) 61.98%), linear-gradient(0deg, rgba(0, 0, 0, 0.3) 18.39%, rgba(0, 0, 0, 0) 100%)',
      //   hoverOverlay: '#0F563D',
      // },
    ],
  },
  {
    id: 2,
    title: 'Free questions',
    steps: [
      {
        id: 1,
        title: 'Register',
        step: '01',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://www.vitelhealth.com/hubfs/who_we_serve_1.jpg',
        overlay:
          'linear-gradient(180deg, rgba(135, 195, 143, 0) 0%, rgba(135, 195, 143, 0.5) 71.87%)',
        hoverOverlay: 'linear-gradient(0deg, #87C38F, #87C38F)',
      },
      {
        id: 2,
        title: 'Enter your information',
        step: '02',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://images.squarespace-cdn.com/content/v1/5d2d63137e6ae200016b6c62/1583138530274-Y6ZHVY0WEA3TCF816R5K/Provider+Credentialing+and+Enrollment.jpg?format=1500w',
        overlay:
          'linear-gradient(180deg, rgba(76, 164, 88, 0) 0%, rgba(76, 164, 88, 0.5) 64.58%)',
        hoverOverlay: 'linear-gradient(0deg, #4CA458, #4CA458)',
      },
      {
        id: 3,
        title: 'Select the department',
        step: '03',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://www.vitelhealth.com/hubfs/who_we_serve_1.jpg',
        overlay:
          'linear-gradient(180deg, rgba(63, 142, 95, 0) 0%, rgba(63, 142, 95, 0.5) 64.58%)',
        hoverOverlay: 'linear-gradient(0deg, #3F8E5F, #3F8E5F)',
      },
      {
        id: 4,
        title: 'Select the doctor',
        step: '04',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://boddenbennettlaw.com/wp-content/uploads/2022/08/8-Questions-to-ask-your-doctor-after-a-South-Florida-Car-Accident.png',
        overlay:
          'linear-gradient(180deg, rgba(34, 111, 84, 0) 0%, rgba(34, 111, 84, 0.5) 62.5%)',
        hoverOverlay: 'linear-gradient(0deg, #226F54, #226F54)',
      },
      // {
      //   id: 5,
      //   title: 'Enjoy the meeting and the result',
      //   step: '05',
      //   text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      //   img: 'https://www.vitelhealth.com/hubfs/who_we_serve_1.jpg',
      //   overlay:
      //     'linear-gradient(180deg, rgba(15, 86, 61, 0) 0%, rgba(15, 86, 61, 0.5) 61.98%), linear-gradient(0deg, rgba(0, 0, 0, 0.3) 18.39%, rgba(0, 0, 0, 0) 100%)',
      //   hoverOverlay:
      //     'linear-gradient(0deg, #0F563D, #0F563D), linear-gradient(0deg, rgba(0, 0, 0, 0.3) 18.39%, rgba(0, 0, 0, 0) 100%)',
      // },
    ],
  },
  {
    id: 3,
    title: 'Analyses',
    steps: [
      {
        id: 1,
        title: 'Register',
        step: '01',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://www.vitelhealth.com/hubfs/who_we_serve_1.jpg',
        overlay:
          'linear-gradient(180deg, rgba(135, 195, 143, 0) 0%, rgba(135, 195, 143, 0.5) 71.87%)',
        hoverOverlay: 'linear-gradient(0deg, #87C38F, #87C38F)',
      },
      {
        id: 2,
        title: 'Enter your information',
        step: '02',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://boddenbennettlaw.com/wp-content/uploads/2022/08/8-Questions-to-ask-your-doctor-after-a-South-Florida-Car-Accident.png',
        overlay:
          'linear-gradient(180deg, rgba(76, 164, 88, 0) 0%, rgba(76, 164, 88, 0.5) 64.58%)',
        hoverOverlay: 'linear-gradient(0deg, #4CA458, #4CA458)',
      },
      {
        id: 3,
        title: 'Select the department',
        step: '03',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://hscsnhealthplan.org/sites/default/files/styles/image_content_list/public/2020-02/credentialing-grid.jpg?itok=-TrE7N6c',
        overlay:
          'linear-gradient(180deg, rgba(63, 142, 95, 0) 0%, rgba(63, 142, 95, 0.5) 64.58%)',
        hoverOverlay: 'linear-gradient(0deg, #3F8E5F, #3F8E5F)',
      },
      {
        id: 4,
        title: 'Select the doctor',
        step: '04',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        img: 'https://boddenbennettlaw.com/wp-content/uploads/2022/08/8-Questions-to-ask-your-doctor-after-a-South-Florida-Car-Accident.png',
        overlay:
          'linear-gradient(180deg, rgba(34, 111, 84, 0) 0%, rgba(34, 111, 84, 0.5) 62.5%)',
        hoverOverlay: 'linear-gradient(0deg, #226F54, #226F54)',
      },
      // {
      //   id: 5,
      //   title: 'Enjoy the meeting and the result',
      //   step: '05',
      //   text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      //   img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsG59kWslK0gelhOqwpjMjmuTKwdHtoUOz855lS2ASuhg0KPksB1mWjssaZ6AdZizmyhY&usqp=CAU',
      //   overlay:
      //     'linear-gradient(180deg, rgba(15, 86, 61, 0) 0%, rgba(15, 86, 61, 0.5) 61.98%), linear-gradient(0deg, rgba(0, 0, 0, 0.3) 18.39%, rgba(0, 0, 0, 0) 100%)',
      //   hoverOverlay:
      //     'linear-gradient(0deg, #0F563D, #0F563D), linear-gradient(0deg, rgba(0, 0, 0, 0.3) 18.39%, rgba(0, 0, 0, 0) 100%)',
      // },
    ],
  },
];

const defaultEcosystemCardValues = [
  {
    id: 1,
    title: 'Medical Consultations',
    // introduction:
    // "If you're considering using a telemedicine portal for your healthcare needs, you’re making an intelligent choice! With Clickmedicus, you will experience first-hand benefits that make seeking medical advice online a convenient and practical option. Our telemedicine services offer you:",
    list: [
      'Quick access to licensed medical professionals who can diagnose and treat your condition.',
      'Easy and convenient access to healthcare from anywhere, at any time.',
      'Save time and money on travel and office visits.',
      'Access to medical experts from a range of specialities and languages.',
    ],
    // conclusion:
    // "Don't wait any longer to experience the benefits of telemedicine. Choose Clickmedicus and take control of your healthcare today.\n",
  },
  {
    id: 2,
    title: 'Urgent Care',
    list: [
      'In a medical emergency, time is of the essence.',
      "That's why our telemedicine portal offers emergency services that prioritize your health and well-being.",
      'Our team of licensed medical professionals is available 24/7 to provide expert advice, ',
      'diagnosis, and treatment for a wide range of emergencies.',
    ],
  },
  {
    id: 3,
    title: 'Ask a free question',
    list: [
      'No inaccurate self-diagnosis or consulting unreliable sources.',
      "With Clickmedicus you can trust that you're getting accurate and reliable information from our qualified Residents.",
      "Don't let fear hold you back – write your question today and take control of your health.",
    ],
  },
];

const Keep = [
  {
    id: 1,
    title: 'Articles',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    img: 'https://media.istockphoto.com/id/829381508/photo/young-man-giving-a-thumbs-up-after-a-successful-surgery.jpg?s=612x612&w=0&k=20&c=iy5IAMLiZ9R0kyMBa-hZ8gZhHrNPeOp5QuMqZBKYxh4=',
    url: 'articles',
  },
  {
    id: 2,
    title: 'News',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    img: 'https://www.globalmedics.com/-/media/global-medics/candidates/uk/becoming-a-locum-doctor/becoming-a-locum-doctor-header.png?h=342&w=781&la=en&hash=5C9C3913C427F3756545F287784AF608',
    url: 'news',
  },
  {
    id: 3,
    title: 'Medical Journal',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZA5aYHXlQ3RMZ4tdqUb0cAa6THmOQxj-w-akmGFtUD0HVRTijQMpx4Lb5g2eX6xhCR80&usqp=CAU',
    url: 'medical-articles',
  },
  {
    id: 4,
    title: 'Forum',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    img: 'https://images.squarespace-cdn.com/content/v1/61829f4239de034887fef275/1647876944838-NR3KRS8BOF50G8YHBS9E/Screenshot+2022-03-21+093511.png',
    url: 'ask-doctor',
  },
];

export {
  Doctors,
  Residents,
  Language,
  Country,
  Departments,
  defaultWorksCardValues,
  defaultEcosystemCardValues,
  Keep,
  Specialities,
};
