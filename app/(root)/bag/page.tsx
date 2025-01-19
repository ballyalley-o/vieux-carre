
import { Metadata } from 'next'
import { getMyBag } from "lib/action";
import BagTable from "./bag-table";

export const metadata: Metadata = { title: 'Shopping Bag' }

const BagPage = async () => {
    const bag = await getMyBag()
    return (
      <div>
        <BagTable bag={bag} />
      </div>
    )
}

export default BagPage;