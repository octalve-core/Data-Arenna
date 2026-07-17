const HomeSubscription = () => {
  return (
    <section id="contact" className="py-5 about">
      <div data-aos="fade-up" data-aos-duration="3000">
        <p className="text-center fs-3 fw-bold">Join our newsletter</p>
        <div
          style={{ maxWidth: "400px" }}
          class="input-group mb-3 mx-auto mt-3"
        >
          <input
            type="email"
            class="form-control"
            placeholder="your email address"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <button class="input-group-text bg-dark text-white" id="">
            Subscribe
          </button>
        </div>
        <p className="text-center text-muted small mt-5">
          We will send you weekly updates for your better <br /> finance
          management.
        </p>
      </div>
    </section>
  );
};

export default HomeSubscription;
