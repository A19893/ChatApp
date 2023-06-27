export const  getTime=(timestamp)=> {
    const date = new Date(timestamp*1000);
    console.log(date)
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
  
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    const formattedTime = hours + ':' + minutes + ' ' + ampm;
    return formattedTime;
  }
