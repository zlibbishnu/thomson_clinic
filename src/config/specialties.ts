export type Specialty = {
  title: string;
  slug: string;
  shortDescription: string;
  heroDescription: string;
  overview: string[];
  conditions: string[];
  services: {
    title: string;
    description: string;
  }[];
  approach: {
    title: string;
    text: string;
  }[];
  whenToConsult: string[];
  relatedSpecialties: string[];
};

export const specialties: Specialty[] = [
  {
    title: "Psychiatry",
    slug: "psychiatry",
    shortDescription:
      "Assessment and treatment of mental health conditions across different stages of life.",
    heroDescription:
      "Specialist assessment and treatment for mental health conditions across different stages of life, with care centred around the individual and their clinical needs.",
    overview: [
      "Psychiatry is the medical specialty concerned with the assessment, diagnosis, treatment and prevention of mental, emotional and behavioural disorders.",
      "Psychiatric care may involve medication, psychotherapy, behavioural interventions, lifestyle measures or a combination of approaches depending on the individual's presentation and goals.",
    ],
    conditions: [
      "Depression",
      "Anxiety disorders",
      "Bipolar disorder",
      "Schizophrenia and psychotic disorders",
      "Obsessive-compulsive disorder",
      "Trauma-related disorders",
      "Personality disorders",
      "Adult ADHD",
      "Sleep-related mental health concerns",
      "Stress and adjustment difficulties",
      "Suicidal thoughts and self-harm concerns",
      "Other emotional and behavioural difficulties",
    ],
    services: [
      {
        title: "Psychiatric Assessment",
        description:
          "Detailed assessment of symptoms, history, functioning and contributing factors to establish an appropriate clinical formulation.",
      },
      {
        title: "Medication Management",
        description:
          "Evidence-based pharmacological treatment with attention to effectiveness, adverse effects, interactions and individual treatment goals.",
      },
      {
        title: "Psychotherapy",
        description:
          "Psychological interventions may be recommended alone or alongside medication depending on the clinical presentation.",
      },
      {
        title: "Second Opinion",
        description:
          "Independent review of an existing psychiatric diagnosis, treatment plan or medication regimen.",
      },
      {
        title: "Follow-up Care",
        description:
          "Ongoing monitoring of symptoms, treatment response, functioning and recovery over time.",
      },
      {
        title: "Online Consultation",
        description:
          "Convenient psychiatric consultations for appropriate conditions through secure online consultation.",
      },
    ],
    approach: [
      {
        title: "Understand",
        text:
          "We begin by understanding the symptoms, concerns, personal history and circumstances surrounding the problem.",
      },
      {
        title: "Assess",
        text:
          "A structured clinical assessment helps clarify the diagnosis, severity, risks and factors influencing recovery.",
      },
      {
        title: "Plan",
        text:
          "Treatment options are discussed based on clinical needs, preferences, risks and expected benefits.",
      },
      {
        title: "Follow through",
        text:
          "Treatment is reviewed over time, with adjustments made according to response, tolerability and changing needs.",
      },
    ],
    whenToConsult: [
      "Symptoms are persistent or recurring",
      "Daily functioning or relationships are affected",
      "Sleep, appetite, mood or behaviour has changed",
      "You need assessment or a treatment review",
    ],
    relatedSpecialties: [
      "psychology",
      "neuropsychiatry",
      "sleep-medicine",
      "addiction-psychiatry",
    ],
  },

  {
    title: "Psychology",
    slug: "psychology",
    shortDescription:
      "Psychological assessment and evidence-based interventions for emotional, behavioural and cognitive concerns.",
    heroDescription:
      "Psychological assessment and evidence-based psychological interventions for emotional, behavioural and cognitive concerns.",
    overview: [
      "Psychology focuses on understanding thoughts, emotions, behaviour and relationships, and how these interact with a person's circumstances and functioning.",
      "Psychological care may include assessment, psychotherapy, behavioural interventions, coping strategies and skills-based approaches.",
    ],
    conditions: [
      "Anxiety and excessive worry",
      "Depressive symptoms",
      "Stress-related difficulties",
      "Adjustment difficulties",
      "Relationship concerns",
      "Behavioural difficulties",
      "Low self-esteem",
      "Emotional regulation difficulties",
      "Trauma-related concerns",
      "Academic and performance concerns",
      "Child and adolescent behavioural concerns",
      "Other psychological difficulties",
    ],
    services: [
      {
        title: "Psychological Assessment",
        description:
          "Structured assessment of cognitive, emotional, behavioural and personality-related functioning.",
      },
      {
        title: "Psychotherapy",
        description:
          "Evidence-based psychological interventions tailored to the person's concerns and treatment goals.",
      },
      {
        title: "Cognitive Behavioural Therapy",
        description:
          "Structured therapy focusing on the relationship between thoughts, emotions and behaviours.",
      },
      {
        title: "Behavioural Interventions",
        description:
          "Practical strategies to modify behaviours and develop healthier patterns of functioning.",
      },
      {
        title: "Stress Management",
        description:
          "Structured approaches to managing stress, coping difficulties and emotional overload.",
      },
      {
        title: "Psychological Support",
        description:
          "Supportive interventions for adjustment, emotional difficulties and life transitions.",
      },
    ],
    approach: [
      {
        title: "Understand",
        text:
          "Explore the person's concerns, circumstances, patterns of thinking and behavioural responses.",
      },
      {
        title: "Assess",
        text:
          "Use clinical interviews and appropriate psychological tools when assessment is indicated.",
      },
      {
        title: "Intervene",
        text:
          "Select evidence-based psychological strategies according to the presenting concerns.",
      },
      {
        title: "Develop",
        text:
          "Build practical skills that can support longer-term psychological wellbeing.",
      },
    ],
    whenToConsult: [
      "Emotional difficulties are affecting everyday life",
      "Stress or anxiety feels difficult to manage",
      "Patterns of thinking or behaviour are causing problems",
      "You want structured psychological support",
    ],
    relatedSpecialties: [
      "psychiatry",
      "child-adolescent-mental-health",
      "neuropsychiatry",
      "sleep-medicine",
    ],
  },

  {
    title: "Neurology",
    slug: "neurology",
    shortDescription:
      "Assessment and management of neurological conditions affecting the brain, spinal cord, nerves and muscles.",
    heroDescription:
      "Evaluation and management of neurological conditions affecting the brain, spinal cord, peripheral nerves and muscles.",
    overview: [
      "Neurology focuses on disorders of the nervous system, including conditions affecting the brain, spinal cord, peripheral nerves and neuromuscular system.",
      "Assessment may involve detailed neurological examination, review of investigations and coordination of appropriate treatment and follow-up.",
    ],
    conditions: [
      "Headache disorders",
      "Migraine",
      "Epilepsy",
      "Stroke-related conditions",
      "Movement disorders",
      "Peripheral neuropathy",
      "Dizziness and vertigo",
      "Memory problems",
      "Neurodegenerative disorders",
      "Sleep-related neurological concerns",
      "Neuromuscular conditions",
      "Other neurological symptoms",
    ],
    services: [
      {
        title: "Neurological Assessment",
        description:
          "Clinical evaluation of neurological symptoms and relevant medical history.",
      },
      {
        title: "Headache Care",
        description:
          "Assessment and management of recurrent headaches and migraine-related problems.",
      },
      {
        title: "Epilepsy Care",
        description:
          "Clinical assessment and ongoing management of seizure disorders.",
      },
      {
        title: "Cognitive Assessment",
        description:
          "Evaluation of memory and cognitive concerns when clinically indicated.",
      },
      {
        title: "Movement Disorder Assessment",
        description:
          "Assessment of tremor, abnormal movements and related neurological symptoms.",
      },
      {
        title: "Follow-up Neurological Care",
        description:
          "Ongoing monitoring of neurological conditions and treatment response.",
      },
    ],
    approach: [
      {
        title: "History",
        text:
          "Understand the nature, timing, progression and associated features of neurological symptoms.",
      },
      {
        title: "Examination",
        text:
          "Clinical neurological examination helps localise and characterise the problem.",
      },
      {
        title: "Investigate",
        text:
          "Relevant investigations are considered based on the clinical assessment.",
      },
      {
        title: "Manage",
        text:
          "Treatment and follow-up are planned according to the underlying neurological condition.",
      },
    ],
    whenToConsult: [
      "You have recurrent or unexplained neurological symptoms",
      "Headaches or dizziness are persistent or changing",
      "There are seizures, abnormal movements or weakness",
      "Memory or other cognitive symptoms are concerning",
    ],
    relatedSpecialties: [
      "neuropsychiatry",
      "psychiatry",
      "sleep-medicine",
      "geriatric-mental-health",
    ],
  },

  {
    title: "Neuropsychiatry",
    slug: "neuropsychiatry",
    shortDescription:
      "Care for conditions involving the interaction between neurological and behavioural symptoms.",
    heroDescription:
      "Clinical care at the intersection of neurology and psychiatry for conditions involving both neurological and behavioural symptoms.",
    overview: [
      "Neuropsychiatry addresses psychiatric, behavioural and cognitive symptoms associated with neurological and brain-related conditions.",
      "The assessment considers both neurological and psychiatric factors to develop an integrated clinical formulation.",
    ],
    conditions: [
      "Cognitive disorders",
      "Behavioural symptoms associated with neurological illness",
      "Neurocognitive disorders",
      "Functional neurological symptoms",
      "Behavioural changes after brain injury",
      "Psychiatric symptoms associated with neurological disorders",
      "Memory difficulties",
      "Brain-behaviour disorders",
    ],
    services: [
      {
        title: "Neuropsychiatric Assessment",
        description:
          "Integrated assessment of neurological, cognitive, emotional and behavioural symptoms.",
      },
      {
        title: "Cognitive Assessment",
        description:
          "Clinical evaluation of memory and other cognitive concerns.",
      },
      {
        title: "Behavioural Assessment",
        description:
          "Assessment of behavioural changes occurring in the context of neurological illness.",
      },
      {
        title: "Brain-Behaviour Consultation",
        description:
          "Evaluation of complex presentations involving both neurological and psychiatric features.",
      },
    ],
    approach: [
      {
        title: "Map",
        text:
          "Clarify neurological, cognitive, emotional and behavioural symptoms.",
      },
      {
        title: "Integrate",
        text:
          "Consider how neurological and psychiatric factors interact.",
      },
      {
        title: "Formulate",
        text:
          "Develop an integrated clinical understanding of the presentation.",
      },
      {
        title: "Coordinate",
        text:
          "Plan treatment and follow-up according to the needs of the individual.",
      },
    ],
    whenToConsult: [
      "Behaviour changes occur with a neurological condition",
      "Cognitive symptoms coexist with psychiatric symptoms",
      "A brain injury is followed by emotional or behavioural changes",
      "The presentation does not fit neatly into one specialty",
    ],
    relatedSpecialties: [
      "neurology",
      "psychiatry",
      "psychology",
      "geriatric-mental-health",
    ],
  },

  {
    title: "Sleep Medicine",
    slug: "sleep-medicine",
    shortDescription:
      "Assessment and management of sleep problems affecting health, functioning and quality of life.",
    heroDescription:
      "Assessment and management of common sleep problems affecting mental health, cognition, functioning and quality of life.",
    overview: [
      "Sleep problems can affect mood, concentration, memory, physical health and everyday functioning.",
      "Assessment considers sleep patterns, daytime symptoms, medical and psychiatric factors, medications and behavioural contributors.",
    ],
    conditions: [
      "Insomnia",
      "Chronic sleep difficulties",
      "Circadian rhythm problems",
      "Excessive daytime sleepiness",
      "Sleep-related anxiety",
      "Sleep disturbance associated with depression",
      "Sleep problems associated with psychiatric illness",
      "Other sleep-wake concerns",
    ],
    services: [
      {
        title: "Sleep Assessment",
        description:
          "Detailed assessment of sleep patterns, symptoms, contributing factors and daytime consequences.",
      },
      {
        title: "Insomnia Management",
        description:
          "Evidence-based approaches for persistent difficulties initiating or maintaining sleep.",
      },
      {
        title: "Sleep Hygiene Guidance",
        description:
          "Practical strategies to improve sleep-related behaviours and routines.",
      },
      {
        title: "Medication Review",
        description:
          "Assessment of medications and substances that may influence sleep.",
      },
    ],
    approach: [
      {
        title: "Characterise",
        text:
          "Understand the timing, pattern and nature of the sleep problem.",
      },
      {
        title: "Identify",
        text:
          "Look for medical, psychiatric, behavioural and environmental contributors.",
      },
      {
        title: "Treat",
        text:
          "Use appropriate behavioural, psychological and pharmacological strategies.",
      },
      {
        title: "Review",
        text:
          "Monitor sleep, daytime functioning and treatment response over time.",
      },
    ],
    whenToConsult: [
      "Sleep difficulties persist despite routine changes",
      "Poor sleep affects daytime functioning",
      "Sleep problems occur alongside anxiety or depression",
      "You rely regularly on medication or substances to sleep",
    ],
    relatedSpecialties: [
      "psychiatry",
      "psychology",
      "neurology",
      "geriatric-mental-health",
    ],
  },

  {
    title: "Addiction Psychiatry",
    slug: "addiction-psychiatry",
    shortDescription:
      "Specialist assessment and treatment for substance use disorders and behavioural addictions.",
    heroDescription:
      "Specialist assessment and treatment for substance use disorders and behavioural addictions, with attention to recovery and relapse prevention.",
    overview: [
      "Addiction psychiatry focuses on the assessment and treatment of substance use disorders and related psychiatric difficulties.",
      "Treatment may involve motivational interventions, medication, psychotherapy, family involvement and relapse-prevention strategies.",
    ],
    conditions: [
      "Alcohol use disorder",
      "Tobacco dependence",
      "Opioid use disorder",
      "Cannabis use",
      "Sedative use disorders",
      "Stimulant use disorders",
      "Multiple substance use",
      "Gambling disorder",
      "Other behavioural addictions",
    ],
    services: [
      {
        title: "Addiction Assessment",
        description:
          "Assessment of substance use patterns, dependence, complications and treatment goals.",
      },
      {
        title: "Medication-Assisted Treatment",
        description:
          "Pharmacological options may be considered where clinically indicated.",
      },
      {
        title: "Withdrawal Management",
        description:
          "Clinical assessment and management planning for withdrawal-related concerns.",
      },
      {
        title: "Relapse Prevention",
        description:
          "Structured strategies to identify triggers and strengthen recovery skills.",
      },
      {
        title: "Motivational Interventions",
        description:
          "Evidence-based approaches to explore ambivalence and strengthen motivation for change.",
      },
      {
        title: "Family Support",
        description:
          "Support and education for families affected by addiction.",
      },
    ],
    approach: [
      {
        title: "Assess",
        text:
          "Understand substance use, dependence, complications and co-occurring psychiatric symptoms.",
      },
      {
        title: "Engage",
        text:
          "Develop a collaborative treatment plan around the person's goals and readiness for change.",
      },
      {
        title: "Treat",
        text:
          "Use appropriate psychological, behavioural and pharmacological interventions.",
      },
      {
        title: "Recover",
        text:
          "Focus on relapse prevention, functioning and sustained recovery.",
      },
    ],
    whenToConsult: [
      "Substance use is difficult to control",
      "Use is affecting work, relationships or health",
      "There are repeated attempts to stop followed by relapse",
      "You are concerned about dependence or withdrawal",
    ],
    relatedSpecialties: [
      "psychiatry",
      "psychology",
      "sleep-medicine",
      "neuropsychiatry",
    ],
  },

  {
    title: "Child & Adolescent Mental Health",
    slug: "child-adolescent-mental-health",
    shortDescription:
      "Mental health assessment and support for children and adolescents with emotional, behavioural or developmental concerns.",
    heroDescription:
      "Mental health assessment and support for children and adolescents experiencing emotional, behavioural or developmental concerns.",
    overview: [
      "Mental health concerns in children and adolescents can present through changes in behaviour, emotions, learning, relationships, sleep or development.",
      "Assessment considers developmental stage, family context, school functioning and the child's individual strengths and difficulties.",
    ],
    conditions: [
      "ADHD",
      "Autism spectrum disorder",
      "Childhood anxiety",
      "Depression",
      "Behavioural problems",
      "Learning-related concerns",
      "Developmental concerns",
      "Sleep difficulties",
      "Adolescent emotional difficulties",
      "Social and relationship difficulties",
    ],
    services: [
      {
        title: "Child Mental Health Assessment",
        description:
          "Developmentally informed assessment of emotional, behavioural and psychological concerns.",
      },
      {
        title: "ADHD Assessment",
        description:
          "Structured evaluation of attention, impulsivity, hyperactivity and functional difficulties.",
      },
      {
        title: "Autism Assessment",
        description:
          "Assessment of social communication, behaviour and developmental history when indicated.",
      },
      {
        title: "Parent Guidance",
        description:
          "Practical support and education for parents and caregivers.",
      },
      {
        title: "Adolescent Mental Health",
        description:
          "Assessment and treatment of emotional and behavioural difficulties during adolescence.",
      },
    ],
    approach: [
      {
        title: "Listen",
        text:
          "Understand the child's or adolescent's experience alongside information from caregivers and other settings.",
      },
      {
        title: "Develop",
        text:
          "Interpret symptoms in the context of developmental stage and individual differences.",
      },
      {
        title: "Support",
        text:
          "Develop interventions involving the child, family and relevant support systems.",
      },
      {
        title: "Review",
        text:
          "Monitor progress across emotional, behavioural, developmental and functional domains.",
      },
    ],
    whenToConsult: [
      "Behaviour or emotions have changed significantly",
      "School or social functioning is deteriorating",
      "There are persistent attention or developmental concerns",
      "The child or adolescent is experiencing significant distress",
    ],
    relatedSpecialties: [
      "psychiatry",
      "psychology",
      "neurology",
      "sleep-medicine",
    ],
  },

  {
    title: "Geriatric Mental Health",
    slug: "geriatric-mental-health",
    shortDescription:
      "Mental health care for older adults considering psychological, neurological, medical and medication-related factors.",
    heroDescription:
      "Mental health care for older adults, considering psychological, neurological, medical and medication-related factors.",
    overview: [
      "Mental health concerns in later life may be influenced by psychological, neurological, medical, social and medication-related factors.",
      "A comprehensive assessment can help distinguish psychiatric symptoms from cognitive disorders and other medical contributors.",
    ],
    conditions: [
      "Late-life depression",
      "Anxiety disorders",
      "Insomnia",
      "Cognitive decline",
      "Neurocognitive disorders",
      "Behavioural symptoms",
      "Adjustment difficulties",
      "Grief-related difficulties",
      "Psychiatric symptoms associated with medical illness",
    ],
    services: [
      {
        title: "Geriatric Psychiatric Assessment",
        description:
          "Comprehensive assessment of emotional, cognitive and behavioural symptoms in later life.",
      },
      {
        title: "Cognitive Assessment",
        description:
          "Evaluation of memory and other cognitive concerns when clinically indicated.",
      },
      {
        title: "Depression & Anxiety Care",
        description:
          "Assessment and treatment of common emotional disorders in older adults.",
      },
      {
        title: "Sleep Management",
        description:
          "Assessment and management of sleep difficulties in later life.",
      },
      {
        title: "Medication Review",
        description:
          "Review of psychiatric and other medications with attention to tolerability and interactions.",
      },
    ],
    approach: [
      {
        title: "Understand",
        text:
          "Consider psychological symptoms alongside medical, neurological and social circumstances.",
      },
      {
        title: "Differentiate",
        text:
          "Assess cognitive and behavioural symptoms carefully to clarify possible causes.",
      },
      {
        title: "Individualise",
        text:
          "Develop treatment plans that account for age, comorbidities, medications and personal goals.",
      },
      {
        title: "Monitor",
        text:
          "Follow symptoms, functioning, cognition, treatment response and adverse effects.",
      },
    ],
    whenToConsult: [
      "There is persistent low mood or anxiety",
      "Sleep difficulties are affecting daytime functioning",
      "Memory or cognitive changes are concerning",
      "There are new behavioural or psychological changes",
    ],
    relatedSpecialties: [
      "psychiatry",
      "neurology",
      "neuropsychiatry",
      "psychology",
    ],
  },
];

export function getSpecialtyBySlug(slug: string) {
  return specialties.find((specialty) => specialty.slug === slug);
}