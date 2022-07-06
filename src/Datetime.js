import React from 'react';

var datetime = () => {
    var showdate = new Date();
    var displaytodaysdate=showdate.getDate() + ':' + (showdate.getMonth() + 1) + ':' + showdate.getFullYear();
    var dt = showdate.toDateString();
    var displaytime = showdate.getHours()+ ':' + showdate.getMinutes() + ':' + showdate.getSeconds();
    return (
        <div>
            <center>
                <input type="text" value = {displaytodaysdate} readOnly='true'/>
                {dt} = {displaytime}
            </center>
        </div>
    );
}
export default datetime;