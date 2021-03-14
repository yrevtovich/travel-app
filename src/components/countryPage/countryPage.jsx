import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FetchData from '../../utils/fetchData';
import { setCountryConfig, setPlacesByCountry } from '../../actions/control';
import PageImageGallery from '../imageGallery/imageGallery';
import dateWidget from '../../assets/images/date-widget.png';
import weatherWidget from '../../assets/images/weather-widget.png';
import exchangeRatesWidget from '../../assets/images/exchange-rates-widget.png';
import mapImg from '../../assets/images/map.png';
import './countryPage.scss';

const CountryPage = () => {
  const { country } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchClass = new FetchData('https://travel-app-back-113.herokuapp.com/api');

    const redirect = () => {
      history.push('/*');
    };

    fetchClass.getCountry(country)
      .then(([countryConfig]) => {
        if (!countryConfig) {
          throw new Error('Page not found');
        }
        dispatch(setCountryConfig(countryConfig));
      })
      .then(() => {
        fetchClass.getPlacesByCountry(country)
          .then((places) => {
            dispatch(setPlacesByCountry(places));
          });
      })
      .catch((err) => {
        console.log('Error - ', err);
        redirect();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentPlaces = useSelector((rootState) => rootState.control.currentPlaces);
  const countryData = useSelector((rootState) => rootState.control.countryConfig);
  const currentLanguage = useSelector((rootState) => rootState.control.applicationLanguage);

  const { name, capital, description } = countryData.info[currentLanguage];
  const { mainPlace } = countryData;

  const capitalTitle = {
    en: 'Capital',
    ru: 'Столица',
    be: 'Сталіца',
  };

  return (
    <main className="country-page">
      <div className="country-page__wrapper">
        <div className="country-page__info">
          <div className="country-page__country">
            <h2 className="country-page__name">{name}</h2>
            <p className="country-page__capital">
              {capitalTitle[currentLanguage]}
              :&nbsp;
              {capital}
            </p>
          </div>
          <img
            className="country-page__image"
            src={mainPlace.image}
            alt={mainPlace[currentLanguage].name}
          />
          <p className="country-page__description">{description}</p>
          <div className="country-page__widgets">
            <div className="country-page__widget">
              <img src={dateWidget} alt="Date widget" />
            </div>
            <div className="country-page__widget">
              <img src={weatherWidget} alt="Weather widget" />
            </div>
            <div className="country-page__widget">
              <img src={exchangeRatesWidget} alt="Exchange rates widget" />
            </div>
          </div>
          <PageImageGallery />
          <div className="country-page__video">
            <img
              className="country-page__image"
              src={mainPlace.image}
              alt="example"
            />
          </div>
        </div>
      </div>
      <div className="country-page__map">
        <img src={mapImg} alt="map example" />
      </div>
    </main>
  );
};

export default CountryPage;
