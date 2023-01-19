import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const AuthHeaders =  {
      token: cookies.get('usertkn')
};