import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { CustomerTable } from "../components/CustomerTable";
import axios, { AxiosResponse } from "axios";

type CampaignData = {
  title: string;
  description: string;
  targetGroup: string;
  campaignStatus: string;
};

export const Customers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>("");
  const [campaign, setCampaign] = useState<CampaignData[]>([]);

  const [formData, setFormData] = useState<CampaignData>({
    title: "",
    description: "",
    targetGroup: selectedTargetGroup,
    campaignStatus: "",
  });

  const modalRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTargetGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedTargetGroup(selectedValue);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: CampaignData = {
      title: formData.title,
      description: formData.description,
      targetGroup: selectedTargetGroup,
      campaignStatus: "",
    };
    try {
      const response: AxiosResponse = await axios.post(
        "https://vibrannium-challenge-backend-api.vercel.app/campaigns/create",
        data
      );
      console.log(response);
      closeModal();
      getCampaigns();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCampaigns = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        "https://vibrannium-challenge-backend-api.vercel.app/campaigns/getcampaigns"
      );

      setCampaign(response.data);
    } catch (error) {
      console.error("Error getting campaigns:", error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      // Add the event listener when the modal is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove the event listener when the modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <section className="h-screen px-4 lg:px-[250px] bg-[#F3F4F6] border border-ch[rgba(204, 207, 206, 0.24)]">
      <h1 className="pt-[32px] text-[#00100B] text-[20px] font-semibold">
        Customers
      </h1>

      <p className="pt-[16px] text-[#808785] text-[14px]">
        See all your customers in one place
      </p>

      <div className="pt-[20px] border-b border-b-[rgba(204, 207, 206, 0.24)] flex items-center">
        <p className="text-[#808785] text-[14px] pb-4">Customer Log</p>
        <p className="text-[14px] text-[#00100B] font-semibold pb-4 border-b-2 border-black px-4 ml-2 cursor-pointer">
          Campaigns
        </p>
      </div>

      <div className="mt-[24px] lg:flex justify-between">
        <form action="" className="flex">
          <div className="flex p-[16px] h-[48px] items-center border rounded-[6px]  border-[rgba(204, 207, 206, 0.40)] bg-white w-[500px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
            >
              <circle
                cx="8.80553"
                cy="8.8055"
                r="7.49047"
                stroke="#808885"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0153 14.4043L16.9519 17.3333"
                stroke="#808885"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="outline-none w-full placeholder:text-[13px] pl-2"
              placeholder="Search customer log by customer name, email address & phone number"
            />
          </div>
          <button className="flex ml-2 h-[48px] p-[16px] items-center justify-center gap-[10px] rounded-[6px] border border-[#004741] text-[#004741] text-[14px] font-semibold bg-white">
            Search
          </button>
        </form>

        <button
          onClick={openModal}
          className=" sm:mt-0 mt-3 flex h-[48px] p--[16px] w-[176px] justify-center items-center gap-[10px] rounded-[6px] border border-[#004741] bg-[#004741]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              d="M11.0969 12.5195H5.0802"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.0969 9.03076H5.0802"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.37603 5.55009H5.0802"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2572 1.2915C11.2572 1.2915 4.85965 1.29484 4.84965 1.29484C2.54965 1.309 1.12549 2.82234 1.12549 5.13067V12.794C1.12549 15.114 2.56049 16.6332 4.88049 16.6332C4.88049 16.6332 11.2772 16.6307 11.288 16.6307C13.588 16.6165 15.013 15.1023 15.013 12.794V5.13067C15.013 2.81067 13.5772 1.2915 11.2572 1.2915Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-white text-[14px] font-semibold">
            Create a campaign
          </p>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto backdrop-blur-[3px] bg-white/30">
          <form
            ref={modalRef}
            action=""
            className="absolute bg-white w-[350px] sm:w-[480px] sm:h-[716px] p-[32px] rounded-[6px] shadow-lg "
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
              >
                <path
                  d="M11.0968 12.5195H5.08017"
                  stroke="#00100B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.0968 9.03076H5.08017"
                  stroke="#00100B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.37609 5.55009H5.08026"
                  stroke="#00100B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.2572 1.2915C11.2572 1.2915 4.85967 1.29484 4.84967 1.29484C2.54967 1.309 1.1255 2.82234 1.1255 5.13067V12.794C1.1255 15.114 2.5605 16.6332 4.8805 16.6332C4.8805 16.6332 11.2772 16.6307 11.288 16.6307C13.588 16.6165 15.013 15.1023 15.013 12.794V5.13067C15.013 2.81067 13.5772 1.2915 11.2572 1.2915Z"
                  stroke="#00100B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[20px]">Create a campaign</p>
            </div>

            <div className="mt-[40px]">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-[14px] font-semibold">
                  Campaign Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="p-[16px] border rounded-[6px] outline-none placeholder:text-[14px] mt-[16px]"
                  placeholder="Write your campaign title here"
                />

                <label
                  htmlFor=""
                  className="text-[14px] font-semibold mt-[32px]"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleTextareaChange}
                  className="p-[16px] resize-none border rounded-[6px] outline-none placeholder:text-[14px] mt-[16px]"
                  placeholder="Write your message here"
                  rows={6}
                />
                <p className="text-right text-[14px] mt-[16px] text-[#CCCFCE]">
                  Max: 100 words
                </p>

                <label
                  htmlFor=""
                  className="text-[14px] font-semibold mt-[32px]"
                >
                  Target group
                </label>
                <div className="relative mt-3">
                  <select
                    onChange={handleTargetGroupChange}
                    value={selectedTargetGroup}
                    className="block h-[48px] appearance-none w-full bg-white border border-[#CCCFCE] hover:border-gray-500  rounded  leading-tight  focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select your target group</option>
                    <option value="All customers">All customers</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-[#004741] text-white rounded-[6px] mt-[32px] h-[48px] text-[16px]"
                >
                  Submit your comment
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <CustomerTable campaigns={campaign} />

      <div className="flex items-center justify-end mt-[36px] ">
        <div className="flex items-center w-40 justify-around">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              d="M0.833374 5.18288L10.8334 5.18288"
              stroke="#AAAFAE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.86658 9.19914L0.833243 5.18314L4.86658 1.16647"
              stroke="#AAAFAE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <button className="w-[32px] h-[32px] text-[12px] bg-[#004741] text-white rounded-full">
            1
          </button>
          <button className="w-[32px] h-[32px] text-[12px] text-[#004741] bg-white rounded-full">
            2
          </button>
          <button className="w-[32px] h-[32px]  text-[#004741] bg-white rounded-full flex justify-center ">
            ...
          </button>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              d="M11.1666 5.18288L1.16663 5.18288"
              stroke="#004741"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.13342 9.19914L11.1668 5.18314L7.13342 1.16647"
              stroke="#004741"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
