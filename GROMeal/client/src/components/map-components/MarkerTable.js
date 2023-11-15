import React from 'react';


function MarkerTable(props) {
    return (
        <table id='mapTable' className="MarkerTable table">
            <thead>
                <tr>
                    <th>Input Address</th>
                    <th>Formatted Address (from OpenCage)</th>
                    <th>Latitude/Longitude</th>
                </tr>
            </thead>
            <tbody>
            {
                props.places.map(p => (
                    <tr id='mapTBody' key={p.input_address}>
                        <td className='mapCells'>{ p.input_address }</td>
                        <td className='mapCells'>{ p.formatted_address }</td>
                        <td className='mapCells'>{p.latLng.join('/')}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default MarkerTable;