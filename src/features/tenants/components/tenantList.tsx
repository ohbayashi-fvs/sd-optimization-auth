import type { Tenant } from "@/types/tenant/tenant";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  tenants: Tenant[];
};

export const TenantList: FC<Props> = ({ tenants }) => {
  const route = useRouter();

  const onClickEditButton = async (id: string) => {
    route.push(`/tenants/edit/${id}`);
  };

  return (
    <>
      {tenants ? (
        <table className="max-w-[53rem] mx-auto my-[4.5rem] border-collapse">
          <thead className="bg-[#FAFAFA]">
            <tr className="flex h-[3.5rem] border-solid border-[0.1rem] border-black border-opacity-[6%] border-t-0 border-x-0">
              <th className="flex items-center min-w-[10rem] pl-[1rem] mr-[1rem] text-start text-[1rem] font-medium">
                組織名
              </th>
              <th className="flex items-center min-w-[5rem] text-start text-[1rem] font-medium before:content-[''] before:inline-block before:mr-[1rem] before:border-solid before:border-[0.1rem] before:border-y-0 before:border-r-0 before:border-black before:border-opacity-[6%] before: before:h-[1.4rem]">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant: Tenant) => (
              <tr
                key={tenant.id}
                className="flex items-center border-[#FAFAFA] border-[0.15rem] border-t-0 border-x-0 border-solid h-[3.5rem]"
              >
                <td className="min-w-[10rem] pl-[1rem] mr-[1rem]">
                  {tenant.tenant_name}
                </td>
                <td className="min-w-[5rem] pl-[1rem]">
                  <button
                    type="button"
                    onClick={async () => {
                      await onClickEditButton(tenant.id);
                    }}
                    className="m-0 p-0 ml-[0.5rem] hover:bg-[#B9C3CF]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/edit_icon@2x.png"
                      alt="編集アイコン"
                      className="w-[1.25rem] m-[0.2rem]"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      ) : (
        <></>
      )}
    </>
  );
};
