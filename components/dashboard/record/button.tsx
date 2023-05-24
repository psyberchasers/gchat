'use client';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Record } from '@prisma/client';

import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';

const RecordButton = ({ records }: { records: Record[] }) => {
    const router = useRouter();

    const t = useTranslations('dashboard');

    const handleExport = async () => {
        const data = records.map((record) => {
            return {
                id: record.id,
                type: record.type,
                title: record.title,
                content: record.content,
                share: record.share,
                createdAt: record.createdAt,
            };
        });

        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = siteConfig.title + '-conversation-record-export-' + new Date() + '.json';
        a.click();
    };

    const handleDelete = async () => {
        const confirm = window.confirm(t('Are you sure you want to delete all records?'));

        if (confirm) {
            const response = await fetch('/api/record/delete', {
                method: 'DELETE',
            });

            if (!response.ok) {
                toast.error(t('Something went wrong, please try again later'));
                return;
            }

            toast.success(t('Successfully deleted all records'));

            router.refresh();
        }
    };

    return (
        <div className='flex items-center justify-end space-x-3'>
            <Button variant='outline' onClick={handleExport} className='dark:border-stone-400'>
                {t('Export All')}
            </Button>
            <Button variant='destructive' onClick={handleDelete}>
                {t('Delete All')}
            </Button>
        </div>
    );
};

export default RecordButton;
