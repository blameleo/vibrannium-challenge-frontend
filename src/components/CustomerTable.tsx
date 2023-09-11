type Campaign = {
  title: string;
  description: string;
  targetGroup: string;
  campaignStatus: string;
};

type CustomerTableProps = {
  campaigns: Campaign[];
};

export const CustomerTable: React.FC<CustomerTableProps> = ({ campaigns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border-collapse table-auto  mt-[24px] border rounded">
        <thead className="  ">
          <tr
            className="
          text-[13px] text-[#00100B]  "
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
              <tr className="text-[11px] bg-white border-b text-[#55605C]">
                <td className="text-left px-[15px]  py-[10px] sm:px-[12px] ">
                  {campaign.title}
                </td>
                <td className="truncate max-w-[200px] px-[4px]  text-left py-[10px] sm:px-[24px]">
                  {campaign.description}
                </td>
                <td className="py-[10px] px-[15px] sm:px-[12px]">
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
    </div>
  );
};
