import React from 'react';

const Resources = ({ moneys }) => {
    return(
        <>
            <tr>
                <td>
                    合計
                </td>
                <td>
                    電気代
                </td>
                <td>
                    ガス代
                </td>
                <td>
                    水道代
                </td>
            </tr>
          {moneys.map((money)  => (
                <tr key={money.id}>
                    <td>
                        {money.total}
                    </td>
                    <td>
                        {money.elect}
                    </td>
                    <td>
                        {money.gass}
                    </td>
                    <td>
                        {money.water}
                    </td>
                </tr>
          ))}
        </>
    );
};

export default Resources;