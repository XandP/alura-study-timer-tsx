import StudyButton from '../StudyButton';
import Clock from './Clock';
import Style from '../../styles/studyCronometer.module.scss';
import { timeToSeconds } from '../../common/utils/time';
import { ITasks } from '../../types/ITask';
import { useEffect, useState } from 'react';

interface Props {
    selected: ITasks | undefined,
    endTask: () => void
}

export default function StudyCronometer({ selected, endTask }: Props) {
    const [time, setTime] = useState<number>();

    useEffect (() => {
        if(selected?.time) {
            setTime(timeToSeconds(selected.time))
        }
    }, [selected])

    function regressiveTimer(counter: number = 0) {
        setTimeout(() => {
            if(counter > 0) {
                setTime(counter-1);
                return regressiveTimer(counter-1);
            }
            endTask();
        }, 1000);
    }

    return(
        <div className={Style.cronometer}>
            <p className={Style.title}>Escolha um card e inicie o cronômetro.</p>
            <div className={Style.clockWrapper}>
                <Clock time={ time }/>
            </div>
            <StudyButton onClick={() => regressiveTimer(time)}>
                Começar!
            </StudyButton>
        </div>
    )
}