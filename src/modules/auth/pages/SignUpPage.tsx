import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import logo from '../../../logo-420-x-108.png';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { fetchThunk } from '../../common/redux/thunk';
import SignUpForm from '../components/SignUpForm';

type Props = {};

function SignUpPage({}: Props) {
  const history = useHistory();
  const [locations, setLocations] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [pid, setPid] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const getLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      const json = await fetchThunk(`http://api.training.div3.pgtest.co/api/v1/location`);
      setIsLoading(false);
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        setLocations(json.data);
        return;
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  const getCities = useCallback(async (pid: any) => {
    setIsLoading(true);
    try {
      const json = await fetchThunk(`http://api.training.div3.pgtest.co/api/v1/location?pid=${pid}`);
      setIsLoading(false);
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        setCities(json.data);
        return;
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  const onSignUp = async (values: any) => {
    try {
      const json = await fetchThunk('http://api.training.div3.pgtest.co/api/v1/auth/register', 'post', values);
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        alert('Đăng kí thành công');
        history.push('/login');
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    getCities(pid);
  }, [pid]);

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '200px', margin: '32px' }} />
      <SignUpForm locations={locations} cities={cities} setPid={setPid} onSignUp={onSignUp} />
    </div>
  );
}

export default SignUpPage;
