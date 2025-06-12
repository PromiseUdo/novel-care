import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const services1 = [
  {
    icon: "/profile-user.png",
    title: "Community and Social Participation",
    description:
      "Social participation improves general health and wellbeing. At Novel Care Services we do our best to assist our clients to be part of the community they choose. We assist our clients to develop and maintain the communication skills and social interaction skills required to function effectively. This service is provided in a non-judgemental and friendly atmosphere. We specialise in assisting clients to participate in social activities such as sports, swimming, yoga, pilates, dancing, and movies. Social skills such as shopping for groceries at bargain prices and money management are also taught by our experienced staff.",
  },
  {
    icon: "/profile-user.png",
    title: "Job skills and Employment",
    description:
      "People living with disability have a right to gainful employment. At Novel Care Services, we provide help in mapping and developing job skills for people with disability. The job skill training is given based on the goals set by our clients. We also provide support with job applications, preparation for interviews and attending interviews. Our approach is to go the extra mile for our clients by advocating on behalf of our clients.",
  },
  {
    icon: "/profile-user.png",
    title: "24/7 Accommodation (including respite)",
    description:
      "Novel Care provides bespoke, comfortable and homely accommodation for people with disability. Our accommodation service comes with 24-hour care with the presence of friendly and experienced support workers. Respite care is not limited to a specific place. We can providerespite care for you in the comfort of of your own home or wherever you choose. It is important to mention here that respite caregiving can happen for as short as a few hours to a few weeks (such as during a caregiver's vacation).",
  },
  {
    icon: "/profile-user.png",
    title: "Mental Health and Psychosocial Recovery Coach",
    description:
      "A Mental Health and Psychosocial Recovery Coach is a professional who provides support and guidance to individuals dealing with mental health challenges and psychosocial issues. They work with clients to help them develop coping strategies, build resilience, and achieve their personal recovery goals. These coaches are trained in mental health and psychosocial principles and practices, and they may have a background in psychology, counseling, social work, or related fields. They do not provide therapy or clinical treatment, but rather focus on empowering individuals to take control of their lives and improve their overall well-being. The role of a Mental Health and Psychosocial Recovery Coach may involve offering emotional support, helping clients set achievable goals, assisting with problem-solving, and providing tools and techniques to manage stress and improve mental wellness. They can be an essential part of a person's support system, especially during times of transition or when navigating challenging life circumstances.",
  },
  {
    icon: "/profile-user.png",
    title: "Psychosocial Recovery Coaching to Participants",
    description:
      "Psychosocial Recovery Coaching is a support approach provided to individuals dealing with mental health challenges and psychosocial issues. The primary goal is to empower participants to take charge of their recovery journey and improve their overall well-being. The coaches, who are trained in mental health and psychosocial principles, offer emotional support, help set achievable goals, and assist with problem-solving. They provide tools and techniques to manage stress, build resilience, and develop coping strategies. Psychosocial Recovery Coaching does not involve therapy or clinical treatment but focuses on helping participants regain control of their lives. It emphasizes personal growth, social inclusion, and fostering a sense of empowerment and autonomy for the participants. By working with individuals in their recovery process, Psychosocial Recovery Coaching aims to enhance their social participation, self-determination, and overall quality of life.",
  },
  {
    icon: "/profile-user.png",
    title: "Group and Centre-Based Activities",
    description:
      "Group and center-based activities are organized programs that gather people in a common location to engage in various social and recreational activities. These activities foster a sense of community and provide opportunities for individuals to connect with others who share similar interests or goals. The activities can range from educational workshops and skill-building sessions to leisure and recreational pursuits, contributing to participants' personal growth and social well-being.",
  },
  {
    icon: "/profile-user.png",
    title:
      "Assistance With Daily Life Tasks In A Group or Shared Living Arrangements",
    description:
      "Assistance with daily life tasks in a group or shared living arrangement refers to the support provided to individuals living in a communal setting, such as a group home, assisted living facility, or shared housing. The assistance is aimed at helping residents with various activities of daily living (ADLs) to promote their well-being, independence, and overall quality of life. In such settings, trained staff or caregivers offer personalized assistance based on the residents' specific needs and abilities. The support can include help with tasks such as personal hygiene, meal preparation, medication management, housekeeping, transportation, and social engagement. The goal is to create a supportive environment where individuals can live comfortably while receiving the help they require to maintain their daily routines and participate in communal activities. This type of assistance allows individuals with disabilities, elderly individuals, or those with certain health conditions to live in a community setting and receive the necessary help to lead fulfilling lives while preserving their autonomy as much as possible.",
  },
  {
    icon: "/profile-user.png",
    title: "SIL Accomodation",
    description: (
      <span>
        Specialized Independent Living offers personalized housing and support
        services for individuals with specific disabilities or conditions. The
        focus is on empowering individuals to live independently while receiving
        specialized assistance that caters to their unique needs. This approach
        enables individuals to participate actively in society, fostering a
        sense of independence, and promoting their overall well-being.{" "}
        <Link
          href="/sil"
          className="text-[#E67817] underline hover:text-[#d16c14] transition-colors"
        >
          Read More
        </Link>
      </span>
    ),
  },
];

const services2 = [
  {
    icon: "/profile-user.png",
    title: "Daily living",
    description:
      "Novel Care Services provides assistance with daily living activities. For people with disability, daily living activities such as cooking and shopping can be difficult. We offer a helping hand in this regard for wide range of activities. If the activity is important to you, then it is our task to ensure that it happens!",
  },
  {
    icon: "/profile-user.png",
    title: "Life Skills",
    description:
      "Life skills include all those activities that are necessary to live a more fulfiling life. Novel Care Services assists people living with disability in developing the required life skills, from preparing meals to communicating with other people. Awareness of life skills helps a person live an independent life. For example, money handling is a very important skill that everyone should be aware of. Other examples include management of household bills, and home maintenance. To live a healthy lifestyle, it is very important to follow a healthy diet plan. We assist people with disability to plan out a healthy weekly menu.",
  },
  {
    icon: "/profile-user.png",
    title: "Community Services",
    description:
      "We work with you to ensure that you are able to attend and participate in the activities that you love and enjoy. We organise fun and educative activities for your enjoyment",
  },
  {
    icon: "/profile-2user.png",
    title: "Community and Social Participation",
    description:
      "Community and Social Participation refers to the active involvement of individuals in various social activities and groups within their community. It emphasizes the importance of social connections and meaningful engagement for personal well-being and community cohesion. Examples include volunteering, joining clubs, attending community events, participating in support groups, engaging in community services, and being politically active. Encouraging community and social participation is crucial for creating a sense of belonging, reducing isolation, and fostering a supportive and inclusive community environment. It contributes to individuals' overall well-being and strengthens the community as a whole.",
  },
  {
    icon: "/wifi-square.png",
    title: "Innovative Community Participation",
    description:
      "Innovative community participation refers to the use of creative and novel approaches to engage individuals and communities in various social activities and decision-making processes. The goal is to foster active involvement, collaboration, and ownership within the community.",
  },
  {
    icon: "/brifecase-tick.png",
    title: "Supported Employment",
    description:
      "Supported Employment is a program that helps individuals with disabilities or barriers secure and retain employment in regular work settings. It offers personalized support to match individual strengths and interests with suitable job opportunities. By providing ongoing assistance and guidance, Supported Employment aims to enhance the participants' job skills, boost their confidence, and promote their long-term success in the workplace.",
  },
  {
    icon: "/airplane.png",
    title: "Assistance with Travel/Transport Arrangements",
    description:
      "Assistance with travel/transport arrangements involves providing support to individuals, particularly those with disabilities or mobility challenges, in planning and organizing their travel needs. The aim is to ensure safe and accessible transportation, helping individuals participate in activities and access services while maintaining their independence. This assistance enhances the overall quality of life for those who may face barriers to travel on their own.",
  },
  {
    icon: "/people.png",
    title: "Participation In Community, Social And Civic Activities",
    description:
      "Participation in community, social, and civic activities refers to the active engagement of individuals in various activities and events within their community and society. It involves taking part in a wide range of interactions, gatherings, and initiatives that contribute to personal growth, community well-being, and civic engagement. Community activities: These activities include participating in local events, festivals, workshops, and support groups. Engaging in community service, volunteering, and being part of neighborhood initiatives are also forms of community participation. Social activities: Social participation involves joining clubs, organizations, or hobby groups that align with one's interests and passions. It includes attending social gatherings, cultural events, and recreational activities that facilitate social connections. Civic activities: Civic participation refers to involvement in political and civic affairs. This can include attending community meetings, participating in local government processes, advocating for causes, and exercising the right to vote. Participation in these activities fosters a sense of belonging and connection within the community. It promotes social inclusion, personal development, and a feeling of contributing positively to the society at large. Being actively involved in community, social, and civic activities enriches individuals' lives and strengthens the fabric of the community as a whole.",
  },
];

const OurServices = () => {
  return (
    <div id="services" className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center w-full gap-[40px]">
          <h2 className="text-[40px] text-[#4E4D4D]">Services</h2>

          <div className="w-full md:max-w-2xl relative ">
            <p className="text-justify md:text-center">
              The needs of people with disability is as varied as their unique
              personalities. We will always work with you to ensure that your
              needs are met the way you want it. Let us know what your goals
              are, our job is to support you in achieving them! We have designed
              a whole range of services to support you. Every one of these
              services can be tailored specially for you. Here are ways we can
              help you achieve your goals:
            </p>
          </div>

          {/* Accordion section */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Group 1 */}
            <Accordion.Root
              type="single" // Changed to single to allow only one item open at a time
              collapsible
              className="w-full flex flex-col gap-6"
            >
              {services1.map((service, idx) => (
                <Accordion.Item
                  key={idx}
                  value={`item-${idx}`}
                  className="p-[10px] border shadow rounded-3xl border-gray-200 w-full"
                >
                  <Accordion.Trigger className="group rounded-2xl min-h-[6rem] flex items-center justify-between w-full py-4 px-6 bg-[#FAE4D180] hover:bg-[#FAE4D1A0] transition-colors">
                    <div className="flex items-center gap-4">
                      <img
                        src={service.icon}
                        alt="Service icon"
                        className="w-8 h-8"
                      />
                      <span className="text-lg text-left font-medium text-[#1E1E1E]">
                        {service.title}
                      </span>
                    </div>
                    <ChevronDownIcon
                      className="w-6 h-6 text-[#292D32] transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="bg-white px-6 py-4 text-[#4E4D4D] overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <p className="leading-[28px]">{service.description}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            {/* Group 2 */}
            <Accordion.Root
              type="single"
              collapsible
              className="w-full flex flex-col gap-6"
            >
              {services2.map((service, idx) => (
                <Accordion.Item
                  key={idx}
                  value={`item-${idx}`}
                  className="p-[10px] border shadow rounded-3xl border-gray-200 w-full"
                >
                  <Accordion.Trigger className="group rounded-2xl min-h-[6rem] flex items-center justify-between w-full py-4 px-6 bg-[#FAE4D180] hover:bg-[#FAE4D1A0] transition-colors">
                    <div className="flex items-center gap-4">
                      <img
                        src={service.icon}
                        alt="Service icon"
                        className="w-8 h-8"
                      />
                      <span className="text-lg text-left font-medium text-[#1E1E1E]">
                        {service.title}
                      </span>
                    </div>
                    <ChevronDownIcon
                      className="w-6 h-6 text-[#292D32] transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="bg-white px-6 py-4 text-[#4E4D4D] overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <p className="leading-[28px]">{service.description}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OurServices;
