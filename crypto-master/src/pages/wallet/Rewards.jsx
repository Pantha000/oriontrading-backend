import WallatNav from '../../components/WallatNav';

const Rewards = () => {
    const data = [
        { id: 1, rank: 'level 1', status: 'processing', wonInvest: '0 / 500', DirectSell: '0 / 400', teamInvest: '0 / 800', activeRefer: "0 / 8" },
        { id: 2, rank: 'level 2', status: 'processing', wonInvest: '0 / 500', DirectSell: '0 / 400', teamInvest: '0 / 800', activeRefer: "0 / 8" },
        { id: 3, rank: 'level 3', status: 'processing', wonInvest: '0 / 500', DirectSell: '0 / 400', teamInvest: '0 / 800', activeRefer: "0 / 8" },
        { id: 4, rank: 'level 4', status: 'processing', wonInvest: '0 / 500', DirectSell: '0 / 400', teamInvest: '0 / 800', activeRefer: "0 / 8" },
        { id: 5, rank: 'level 5', status: 'processing', wonInvest: '0 / 500', DirectSell: '0 / 400', teamInvest: '0 / 800', activeRefer: "0 / 8" },
        { id: 6, rank: 'level 6', status: 'processing', wonInvest: '0 / 500', DirectSell: '0 / 400', teamInvest: '0 / 800', activeRefer: "0 / 8" },
    ];

    return (
        <div className='pt-28 container mx-auto px-4'>
            <WallatNav />
            <div className='m-4 text-center'>
                <h1 className='font-bold text-primary text-2xl'>Rank Incentive</h1>
                <p className='text-center text-lg'>Level up & reward condition</p>
            </div>
            <div className="overflow-x-auto">
                <table className='w-full mx-auto border-collapse border'>
                    <thead>
                        <tr>
                            <th className='text-primary border p-2 bg-bg2'>Rank</th>
                            <th className='text-primary border p-2 bg-bg2'>Status</th>
                            <th className='text-primary border p-2 bg-bg2'>Own Invest</th>
                            <th className='text-primary border p-2 bg-bg2'>Direct Invest</th>
                            <th className='text-primary border p-2 bg-bg2'>Team Invest</th>
                            <th className='text-primary border p-2 bg-bg2'>Active Refer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td className='border text-center p-2'>{item.rank}</td>
                                <td className='border text-center p-2'>{item.status}</td>
                                <td className='border text-center p-2'>{item.wonInvest}</td>
                                <td className='border text-center p-2'>{item.DirectSell}</td>
                                <td className='border text-center p-2'>{item.teamInvest}</td>
                                <td className='border text-center p-2'>{item.activeRefer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Rewards;
