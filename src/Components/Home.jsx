import React from 'react';
import "../Styles/Home.css"
import Product from './Product';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <div className="home__banner">
                    <img src="https://s3images.coroflot.com/user_files/individual_files/large_783291_hbz_qswefiwchggq8l8_athzt.jpg" alt="" />
                   
                </div>
                <div className="home__Products">
                    <Product 
                    id={1}
                    title="iphone X"
                    price={999.99}
                    image="https://i.gadgets360cdn.com/products/large/1536782796_635_iphone_xr.jpg"
                    rating={4}
                    />
                    <Product
                    id={2}
                    title="NOTe 10 samsung"
                    price={899.99}
                    image="https://www.gizbot.com/images/2019-08/samsung-galaxy-note-10-plus_156525010760.jpg"
                    rating={5}

                    />
                   

                </div>
                <div className="home__Products">
                    <Product
                    id={3}
                     title="drone"
                     price={1799.99}
                     image="https://m.media-amazon.com/images/I/51We5oIVy-L._AC_SL1000_.jpg"
                     rating={5} />
                   
                    <Product
                    id={4}
                    title="dress"
                    price={230}
                    image="https://oldnavy.gap.com/Asset_Archive/ONWeb/content/0020/586/573/assets/210614_64-M2328_Baby_DP_BG_SBS.jpg?v=1"
                    rating={4} />
                    <Product
                    id={5}
                    title="ladies bag"
                    price={400}
                    image="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    rating={4} />

                </div>
                <div className="home__Products">
                    <Product 
                    id={6}
                    title="MAc book pro"
                    price={1299.99}
                    image="https://cdn.mos.cms.futurecdn.net/GfinEMFXnT42BFxAcDc2rA.jpg"
                    rating={3}/>
                    
                    

                </div>
               
            </div>
        </div>
    )
}

export default Home
