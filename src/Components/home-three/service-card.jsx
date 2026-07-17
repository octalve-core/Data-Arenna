const HomeThreeServiceCard = ({ icon }) => {
  return (
		<div
			data-aos="fade-up"
			data-aos-duration="3000"
			className="text-center w-64 mx-auto p-4 rounded-lg bg-white shadow">
			<img
				src={require(`../../Assets/${icon}`)}
				alt="service icon"
				className="h-20 mx-auto mb-10"
			/>
			<p className="font-bold text-lg">Service</p>
			<p className="text-xs font-light">
				Lorem ipsum dolor sit amet consectetur. Arcu ultrices sagittis facilisi
				leo velit libero interdum. Et lacus euismod elit in rutrum. Nibh morbi
				tincidunt enim tempus tortor quam lectus ac. Diam.
			</p>
		</div>
	);
};
export default HomeThreeServiceCard;
