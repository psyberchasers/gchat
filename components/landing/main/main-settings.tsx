import { useState, useEffect } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import store from '@/hooks/store';
import { useAtom, useAtomValue } from 'jotai';

import Tippy from '@tippyjs/react';

import { MdInfoOutline } from 'react-icons/md';
import { TbCircleArrowRightFilled } from 'react-icons/tb';

import { Badge } from '@/components/ui/badge';

import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ModeSettings = ({ systemPromptContent, setSystemPromptContent }: { systemPromptContent: string; setSystemPromptContent: (content: string) => void }) => {
    const t = useTranslations('landing');

    // Global Disabled
    const [globalDisabled, setGlobalDisabled] = useState<boolean>(false);

    // Stream Messages
    const [enableStreamMessages, setEnableStreamMessages] = useAtom(store.enableStreamMessagesAtom);

    // No Context Conversation
    const [isNoContextConversation, setIsNoContextConversation] = useAtom(store.noContextConversationAtom);

    // System Prompt
    const [enableSystemPrompt, setEnableSystemPrompt] = useAtom(store.enableSystemPrompt);

    // Plugins
    const [enablePlugins, setEnablePlugins] = useAtom(store.enablePluginsAtom);

    // Service Provider
    const serviceProvider = useAtomValue(store.serviceProviderAtom);

    // OpenAI
    const openAIConfig = useAtomValue(store.openAIConfigAtom);

    // Azure
    const azureConfig = useAtomValue(store.azureConfigAtom);

    // Hugging Face
    const huggingFaceConfig = useAtomValue(store.huggingFaceConfigAtom);

    // Cohere
    const cohereConfig = useAtomValue(store.cohereConfigAtom);

    // Claude
    const claudeConfig = useAtomValue(store.claudeConfigAtom);

    const handleCheckStreamMessages = (value: boolean) => {
        setEnableStreamMessages(value);
    };

    const handleIsNoContextModeChange = (value: boolean) => {
        setIsNoContextConversation(value);
    };

    const handleCheckSystemPrompt = (value: boolean) => {
        setSystemPromptContent('');
        setEnableSystemPrompt(value);
    };

    const handleCheckPlugins = (value: boolean) => {
        setEnablePlugins(value);
    };

    useEffect(() => {
        switch (serviceProvider) {
            case 'OpenAI':
            case 'Team':
            case 'Azure':
                setGlobalDisabled(false);
                setEnableStreamMessages(true);
                break;
            default:
            case 'Cohere':
            case 'Hugging Face':
            case 'Claude':
                setGlobalDisabled(true);
                setEnableSystemPrompt(false);
                setIsNoContextConversation(true);
                setEnableStreamMessages(false);
                break;
        }
    }, [serviceProvider, setEnableStreamMessages, setEnableSystemPrompt, setIsNoContextConversation]);

    let CurrentConfig;

    switch (serviceProvider) {
        case 'OpenAI':
        case 'Team':
            CurrentConfig = (
                <>
                    <p>
                        {t('Current Model')}: <span className='font-semibold'>{openAIConfig?.apiModel}</span>
                    </p>
                    <p>
                        {t('Temperature')}: <span className='font-semibold'>{openAIConfig?.apiTemperature}</span>
                    </p>
                </>
            );
            break;
        case 'Azure':
            CurrentConfig = (
                <>
                    <p>
                        {t('Current Model')}: <span className='font-semibold'>{azureConfig?.apiModel}</span>
                    </p>
                    <p>
                        {t('Temperature')}: <span className='font-semibold'>{azureConfig?.apiTemperature}</span>
                    </p>
                </>
            );
            break;
        case 'Hugging Face':
            CurrentConfig = (
                <>
                    <p>
                        {t('Current Model')}: <span className='font-semibold'>{huggingFaceConfig?.huggingFaceModel}</span>
                    </p>
                </>
            );
            break;
        case 'Cohere':
            CurrentConfig = (
                <>
                    <p>
                        {t('Current Model')}: <span className='font-semibold'>{cohereConfig?.model}</span>
                    </p>
                </>
            );
            break;
        case 'Claude':
            CurrentConfig = (
                <>
                    <p>
                        {t('Current Model')}: <span className='font-semibold'>{claudeConfig?.apiModel}</span>
                    </p>
                </>
            );
            break;
        default:
            break;
    }

    return (
        <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-3'>
            <div className='w-11/12 space-y-2 rounded-lg border p-3 text-sm dark:bg-gray-600 md:w-96'>
                <div className='flex flex-row items-center justify-between'>
                    <div>{CurrentConfig}</div>
                    <Image src={`/img/${serviceProvider}.png`} height={40} width={40} alt={serviceProvider} />
                </div>
                <Separator />
                <div className='flex items-center space-x-2'>
                    <Checkbox checked={enableStreamMessages} onCheckedChange={handleCheckStreamMessages} disabled={globalDisabled} aria-label='Stream Messages Checkbox' />
                    <div className='inline-flex items-center space-x-1'>
                        <p>{t('Stream Messages')}</p>
                        <Tippy content={t('Server-Sent Events (SSE)')}>
                            <button aria-label='Stream Messages Info'>
                                <MdInfoOutline className='text-lg' />
                            </button>
                        </Tippy>
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    <Checkbox checked={isNoContextConversation} onCheckedChange={handleIsNoContextModeChange} disabled={globalDisabled} aria-label='No Context Mode Checkbox' />
                    <div className='inline-flex items-center space-x-1'>
                        <p>{t('No Context Mode')}</p>
                        <Tippy content={t('Create new conversation next time')}>
                            <button aria-label='No Context Mode Info'>
                                <MdInfoOutline className='text-lg' />
                            </button>
                        </Tippy>
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    <Checkbox checked={enableSystemPrompt} onCheckedChange={handleCheckSystemPrompt} disabled={globalDisabled} aria-label='System Prompt Checkbox' />
                    <div className='inline-flex items-center space-x-1'>
                        <p>{t('System Prompt')}</p>
                        <Tippy content={t('Customize the roles of your conversations')}>
                            <button aria-label='System Prompt Info'>
                                <MdInfoOutline className='text-lg' />
                            </button>
                        </Tippy>
                        {enableSystemPrompt && (
                            <Popover>
                                <PopoverTrigger>
                                    <TbCircleArrowRightFilled className='text-lg' />
                                </PopoverTrigger>
                                <PopoverContent className='space-y-2'>
                                    <Textarea placeholder={t('You are a teacher')} value={systemPromptContent} onChange={(e) => setSystemPromptContent(e.target.value)} className='max-h-36' />
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                    <Checkbox checked={enablePlugins} onCheckedChange={handleCheckPlugins} aria-label='Plugins Checkbox' />
                    <div className='inline-flex items-center space-x-1'>
                        <p>{t('Plugins')}</p>
                        <Tippy content={t('Enable plugins for improved AI conversation')}>
                            <button aria-label='Plugins Info'>
                                <MdInfoOutline className='text-lg' />
                            </button>
                        </Tippy>
                        <Badge variant='secondary' className='font-normal'>
                            {t('Beta')}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeSettings;
