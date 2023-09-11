export const CustomerTable = ({ campaigns }) => {
  return (
    <table className="w-[32px] sm:w-full border-collapse table-auto  mt-[24px] ">
      <thead className="border-t-2 border-[#ECECEB] rounded-t-lg">
        <tr
          className="
          text-[13px] text-[#00100B] "
        >
          <th className="font-semibold text-left py-[16px] px-[15px] sm:px-[24px] sm:w-[193px]">
            Campaign Title
          </th>
          <th className="font-semibold text-left py-[16px] px-[15px] sm:px-[24px] sm:w-[400px]">
            Description
          </th>
          <th className="font-semibold text-left py-[16px] px-[15px] sm:px-[24px] sm:w-[140px]">
            Target Group
          </th>
          <th className="font-semibold text-left py-[16px] px-[15px] sm:px-[24px]  sm:w-[190px]">
            Campaign Status
          </th>
        </tr>
      </thead>
      <tbody>
        {campaigns?.map((campaign) => {
          return (
            <tr className="text-[11px] bg-white ">
              <td className="text-left px-[15px]  py-[10px] sm:px-[24px] ">
                {campaign.title}
              </td>
              <td className="truncate px-[4px]  text-left py-[10px] sm:px-[24px]">
                {campaign.description}
              </td>
              <td className="py-[10px] px-[15px] sm:px-[24px]">
                {campaign.targetGroup}
              </td>
              <td className="py-[10px] sm:px-[24px] px-[15px] ">
                {campaign.campaignStatus}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
