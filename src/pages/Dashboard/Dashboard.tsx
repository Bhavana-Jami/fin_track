import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import { TrendingUp, Receipt, PiggyBank } from 'lucide-react';
import { IndianRupee } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
        <CardDataStats
          title="Total Networth"
          total="$3.456K"
          rate="0.43%"
          levelUp
        >
          <TrendingUp className="h-6 w-6 text-primary" />
        </CardDataStats>
        <CardDataStats title="Total Income" total="$45,2K" rate="4.35%" levelUp>
          <IndianRupee className="h-6 w-6 text-primary" />
        </CardDataStats>
        <CardDataStats
          title="Total Expenses"
          total="2.450"
          rate="2.59%"
          levelUp
        >
          <Receipt className="h-6 w-6 text-primary" />
        </CardDataStats>
        <CardDataStats
          title="Total Budger"
          total="3.456"
          rate="0.95%"
          levelDown
        >
          <PiggyBank className="h-6 w-6 text-primary" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default Dashboard;
