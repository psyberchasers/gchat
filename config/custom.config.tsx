import Link from 'next/link';

interface customConfig {
    InputArea: {
        banner: JSX.Element;
    };
    Auth: {
        footer: JSX.Element;
    };
    Dashboard: {
        side: string;
        footer: JSX.Element;
    };
}

export const customConfig: customConfig = {
    InputArea: {
        banner: (
            <p className='text-sm'>
                Copyright © psyberchasers{' '}
                <Link href='https://github.com/psyberchasers/gchat' target='_blank' className='underline'>
                </Link>
            </p>
        ),
    },
    Auth: {
        footer: (
            <p className='text-xs'>
                By continuing, you agree to our{' '}
                <Link href='https://www.#' target='_blank' className='underline'>
                    Terms of Service
                </Link>
                ,{' '}
                <Link href='https://www.#/privacy-policy' target='_blank' className='underline'>
                    Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href='https://www.#/cookies' target='_blank' className='underline'>
                    Cookie Policy
                </Link>
                .
            </p>
        ),
    },
    Dashboard: {
        side: '© gchat',
        footer: (
            <p className='text-center text-sm'>
                Copyright © psyberchasers{' '}
                <Link href='https://github.com/psyberchasers/gchat' target='_blank' className='underline'>
                    Open-Source
                </Link>
                . AGPL-3.0 License.
            </p>
        ),
    },
};
