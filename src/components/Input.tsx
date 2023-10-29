import { useEffect, useRef } from 'react';

interface InputProperties {
    price: string;
    onPriceChange: (price: number) => void;
}

export default function Input({
  price, onPriceChange
}: InputProperties) {
    const inputReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleInput = () => {
        if (!inputReference.current) {
          return;
        }
          inputReference.current.style.width = `${inputReference.current.scrollWidth}px`;
        };
        if (inputReference.current) {
          inputReference.current.addEventListener('input', handleInput);
        }
    }, []);

    return (
        <input
            ref={inputReference}
            className="w-[37px] border-0 bg-green-600 text-center text-3xl text-white outline-none focus:ring-0 m-0 p-0 self-start"
            placeholder='50'
            type='number'
            value={price === '0' ? '' : price}
            onChange={event => onPriceChange(Number(event.target.value))}
            style={{ transition: 'width 0.2s' }}
            autoFocus
        
        />
    );
}
