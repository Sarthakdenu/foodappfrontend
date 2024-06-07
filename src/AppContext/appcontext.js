import { createContext, useState,useEffect } from "react";
import axios from 'axios';
export const  Appcontext = createContext();
export default function AppcontextProvider({children}){
    
     const [user,setuser]= useState({
      email:'',
      username: '',
})
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
      });
    
      const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        role: ''
      });
      const [filterData,setFilterData]=useState([])
      const [restaurantdata, setrestaurantdata] = useState(
      {
        name:'',
        email :'',
        password:'',
        phone:'',
        imageurl:'',
        address:''
      })
      const [dplogindata,setdplogindata]=useState(
        {
          email: '',
        password: ''
        }
      )
      const [dpsignupdata,setdpsignupdata]= useState(
      {
        username:'',
        phone:'',
        currentlocation:'',
        password:'',
        email:''
      }
      )
      const [menuid,setmenuid] = useState(
        {
          id:'',
          amount:'',
          name:'',
          category:''
        }
      )
      const [menuItems, setMenuItems] = useState([]);
      const [wishlistitem,setwishlistitem] = useState([])
      useEffect(()=>
      {
        axios.get('http://localhost:2000/api/v1/getwishlist')
        .then(
          response =>
            {
              setwishlistitem(response.data.menuitems)
            }
           
        ).catch(error=>
          {
            console.error('There is error while fetching wihslist item',error);
          }
        )
      },[]);

      useEffect(() => {
        axios.get('http://localhost:2000/api/v1/getmenuitems')
          .then(response => {
            setMenuItems(response.data.menuinfo);
          })
          .catch(error => {
            console.error('There was an error fetching the menu items!', error);
          });
      }, []);
      const [Restaurant , setrestaurant] = useState([]);
      useEffect(()=>
      {
        axios.get('http://localhost:2000/api/v1/getresturantinfo')
        .then(response=>{
          setrestaurant(response.data.userinfo)
        })
        .catch(err=>
          {
            console.error("there is error while fetching info")
          }
        )
      },[])
      const [restemail,setrestemail]= useState(
        {
          email:''
        }
      )
      const [account,setaccount] = useState(
        {
          username: '',
          email: '',
          phone: '',
          address: '',
          role: '',
          favorites: [{ name: 'Pizza Place' }, { name: 'Sushi Spot' }],
          orders: ''
        }
      )
      // useEffect(()=>
      //   {
      //     axios.get('http://localhost:2000/api/v1/finduser')
      //     .then(
      //       response=>{
      //         setaccount(response.data.user)
      //       }
      //     )
      //     .catch(err=>
      //       {
      //         console.error("there is error while fetching info")
      //       }
      //     )
      //   },[])
        const value = 
        {
            loginData,setLoginData,signupData,setSignupData,menuItems,setMenuItems,Restaurant,setrestaurant,wishlistitem,setwishlistitem,
            restaurantdata,setrestaurantdata,dpsignupdata,setdpsignupdata,dplogindata,setdplogindata,filterData,setFilterData,user,setuser,
            menuid,setmenuid,restemail,setrestemail,account
        }
         return <Appcontext.Provider value={value}>
             {children}
         </Appcontext.Provider>
}