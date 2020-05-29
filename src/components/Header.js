import React,{Component ,useState,useEffect} from 'react';
import axios from 'axios';
import Container from 'components/Container';
import L from 'leaflet';
var results=[ ];
var result=[ ];
var totalCases=0;
const Header = () => {
  let response;
  
  let totalDeaths=0;
  let totalRecovered=0;
  const [tc, settc] = useState( '' );
  const [td, settd] = useState( '' );
  const [tr, settr] = useState( '' );
  useEffect(() => {
  async function casesCalculator(){
    try {
      response = await axios.get('https://corona.lmao.ninja/v2/countries');
    } catch(e) {
      console.log(`Failed to fetch countries: ${e.message}`, e);
      return;
    }

    const { data = [] } = response; 
    const hasData = Array.isArray(data) && data.length > 0;

    if ( !hasData ) return;
    const geoJson = {
      type: 'FeatureCollection',
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
            ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [ lng, lat ]
          }
        }
      })
    }

    console.log(geoJson.features);

    //varaible to store total number of cases
    
   //const casesVariable=geoJson.map()
    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const {
          country,
          updated,
          cases,
          deaths,
          recovered
        } = properties
        totalCases=totalCases+cases;
        totalDeaths=totalDeaths+deaths;
        totalRecovered=totalRecovered+recovered;
      }
    });
    console.log(totalCases);
    settc(totalCases);
    settd(totalDeaths);
    settr(totalRecovered);
    console.log(totalDeaths);
    console.log(totalRecovered);
    results=[totalCases,totalDeaths,totalRecovered];
    console.log(results);
   return totalCases;
  }
  casesCalculator()
},[])

    return (
    <header>
      <Container type="content">
    <p> COVID19 Cases WorldWide:<span style={{
     textTransform:'capitalize',
     display:'inline-block',
     margin:'0 5px',
     backgroundColor:'salmon',
     color:'black',
     padding:'0.05px'
   }}>{tc}</span> <span style={{
    margin:'0 5px',
  }}>TotalDeaths:</span><span style={{
    textTransform:'capitalize',
    display:'inline-block',
    margin:'0 5px',
    backgroundColor:'salmon',
    color:'black',
    padding:'0.05px'
  }}>{td}</span> </p>

      </Container>
    </header>
  );
};

export default Header;
