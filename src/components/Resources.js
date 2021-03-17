import React from 'react';

const Resources = ({ resources }) => {
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
          {resources.map((resource)  => (
                <tr key={resource.id}>
                    <td>
                        {resource.total}
                    </td>
                    <td>
                        {resource.elect}
                    </td>
                    <td>
                        {resource.gass}
                    </td>
                    <td>
                        {resource.water}
                    </td>
                </tr>
          ))}
        </>
    );
};

export default Resources;