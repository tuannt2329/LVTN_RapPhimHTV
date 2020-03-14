import React from 'react';
import Slide from './Slide/Slide';
import TabMovie from './TabMovie/TabMovie';
class Home extends React.Component {
    render() {
        return (
            <div>


                {/* Slide Carousel, Mua vé Nhanh */}
                <Slide />

                {/* Tab Phim đang chiếu, Phim sắp chiếu page home */}
                <TabMovie />
            </div>
        );
    }
}
export default Home;