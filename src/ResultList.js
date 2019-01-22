import React from 'react';

let renderList = (list)=> {
  return list.map((item, id)=>{
    item = JSON.parse(item);
    let {
      city,
      city_rus,
      country,
      country_code,
      country_rus,
      ip,
      latitude,
      longitude,
      region,
      region_rus,
      time_zone,
      zip_code} = item.data;
    return (
      <div key={id} className="result__content">
        <div className="result__name">Проверка ip: {item.ipRequest ? item.ipRequest : 'ip не указан'}</div>
        <ul className="result__list">
          <li>{city}</li>
          <li>{city_rus}</li>
          <li>{country}</li>
          <li>{country_code}</li>
          <li>{country_rus}</li>
          <li>{ip}</li>
          <li>{latitude}</li>
          <li>{longitude}</li>
          <li>{region}</li>
          <li>{region_rus}</li>
          <li>{time_zone}</li>
          <li>{zip_code}</li>
        </ul>
      </div>
    )
  })
}

export default (props) => {
  return (
    <div className="result">
      <div className="result__title">Список запросов:</div>
      {renderList(props.list)}
    </div>
  )
}
