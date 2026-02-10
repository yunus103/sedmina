import { motion } from 'framer-motion';

export default function SectionTitle({
    title,
    subtitle,
    align = 'left',
    className = ''
}) {
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <motion.div
            className={`mb-12 md:mb-16 ${alignClasses[align]} ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
        >
            {subtitle && (
                <motion.span
                    className="inline-block text-xs md:text-sm font-medium tracking-[0.2em] text-primary uppercase mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {subtitle}
                </motion.span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                <span className="font-light italic">{title.split(' ')[0]}</span>{' '}
                <span className="font-bold">{title.split(' ').slice(1).join(' ')}</span>
            </h2>
        </motion.div>
    );
}
