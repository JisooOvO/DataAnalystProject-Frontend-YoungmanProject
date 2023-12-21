
const Arrow = ({ direction, onClick }) => {
    return (
        <span 
            className={`absolute top-[50%] transform -translate-y-1/2 text-4xl z-10 cursor-pointer select-none ${direction === 'left' ? 'left-[-20%] md:left-[-10%]' : 'right-[-20%] md:right-[-10%]'}`}
            onClick={onClick}
        >
            {direction === 'left' ? '◀' : '▶'}
        </span>
    );
};

export default Arrow;

