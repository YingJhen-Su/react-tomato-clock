const Footer = () => {
    return (
        <footer className="text-sm text-center pt-3">
            <p>
                <i className="fa-brands fa-github"></i> 前端練習作品 Code by{" "}
                <a
                    href="https://github.com/YingJhen-Su/react_tomato-clock"
                    target="_blank"
                    className="underline text-blue-700"
                >
                    Vivian Su
                </a>
            </p>
            <p>
                Sound Effect from{" "}
                <a
                    href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=34724"
                    target="_blank"
                    className="underline text-blue-700"
                >
                    Pixabay
                </a>
            </p>
        </footer>
    );
};

export default Footer;
