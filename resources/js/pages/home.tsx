import { Head, Link } from '@inertiajs/react';
import {
    ArrowRightIcon,
    BriefcaseIcon,
    CalculatorIcon,
    CameraIcon,
    CheckCircleIcon,
    CodeIcon,
    LocateIcon,
    MegaphoneIcon,
    PaletteIcon,
    PenToolIcon,
    StarIcon,
    UsersIcon,
} from 'lucide-react';

import { getInitials } from '@/lib/utils';

import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const reasons = [
    {
        Icon: LocateIcon,
        title: 'Fokus Lokal',
        description:
            'Kami percaya kekuatan ada di komunitas. Temukan talenta yang mengerti konteks pasarmu, atau cari proyek dari bisnis yang bisa kamu temui langsung. Setiap transaksi di sini turut memperkuat roda ekonomi di sekitarmu.',
        features: [
            'Verifikasi identitas talenta lokal',
            'Sistem rating dan ulasan terpercaya',
            'Pembayaran aman dan transparan',
            'Dukungan pertemuan langsung',
        ],
    },
    {
        Icon: BriefcaseIcon,
        title: 'Dirancang untuk UMKM',
        description:
            'Lupakan proses rekrutmen yang rumit dan mahal. Dari desain promo singkat hingga bantuan admin mingguan, platform kami dirancang khusus untuk kebutuhan proyek skala kecil yang fleksibel, cepat, dan sesuai dengan anggaran usaha Anda.',
        features: ['Proses rekrutmen yang sederhana', 'Harga yang sesuai anggaran UMKM', 'Kontrak yang fleksibel', 'Pembayaran berbasis milestone'],
    },
    {
        Icon: UsersIcon,
        title: 'Tumbuh Bersama Komunitas',
        description:
            'Misi kami lebih dari sekadar menghubungkan. Setiap proyek yang selesai di WadahKerja berarti sebuah langkah maju bagi UMKM dan sebuah karya baru untuk portofolio talenta lokal. Di sini, kita tumbuh dan maju bersama.',
        features: ['Program pengembangan talenta', 'Pelatihan dan sertifikasi', 'Networking event regular', 'Kesempatan kolaborasi lintas proyek'],
    },
];

const howItWorksSteps = [
    {
        step: '01',
        title: 'Daftar & Verifikasi',
        description: 'Buat profil lengkap dan verifikasi identitas untuk membangun kepercayaan dengan komunitas.',
        forEmployer: 'Jelaskan kebutuhan bisnis Anda',
        forTalent: 'Tunjukkan keahlian dan portofolio',
    },
    {
        step: '02',
        title: 'Temukan & Terhubung',
        description: 'Gunakan filter lokasi dan kategori untuk menemukan yang tepat untuk Anda.',
        forEmployer: 'Cari talenta terdekat yang sesuai',
        forTalent: 'Telusuri proyek menarik di sekitar',
    },
    {
        step: '03',
        title: 'Kolaborasi & Selesaikan',
        description: 'Mulai bekerja sama, komunikasi langsung, dan raih kesuksesan bersama.',
        forEmployer: 'Pantau progress proyek',
        forTalent: 'Kerjakan dengan profesional',
    },
];

const skillIconMap = {
    'Desain Grafis': PaletteIcon,
    'Web Development': CodeIcon,
    'Digital Marketing': MegaphoneIcon,
    Akuntansi: CalculatorIcon,
    Fotografi: CameraIcon,
    'Content Writing': PenToolIcon,
    // Default icon for other skills
    default: BriefcaseIcon,
};

const statistics = [
    { number: '2,500+', label: 'Proyek Selesai' },
    { number: '1,800+', label: 'Talenta Aktif' },
    { number: '950+', label: 'UMKM Terdaftar' },
    { number: '98%', label: 'Tingkat Kepuasan' },
];

const testimonials = [
    {
        name: 'Nurlaelah',
        role: 'Pemilik Toko Online Fashion',
        avatar: 'https://i.pravatar.cc/150?img=1',
        content: 'WadahKerja membantu saya menemukan designer grafis lokal yang sempurna untuk brand saya. Prosesnya cepat dan hasilnya memuaskan!',
        rating: 5,
    },
    {
        name: 'Ahmad Zacky',
        role: 'Freelance Web Developer',
        avatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Platform ini membuka banyak peluang proyek menarik dari UMKM di sekitar. Pembayarannya juga aman dan tepat waktu.',
        rating: 5,
    },
    {
        name: 'Anggara Rizky',
        role: 'Pemilik Kafe',
        avatar: 'https://i.pravatar.cc/150?img=3',
        content: 'Saya berhasil menemukan content creator yang memahami target market kafe saya. Engagement media sosial naik drastis!',
        rating: 5,
    },
];

interface HomeProps {
    popularSkills: {
        id: number;
        name: string;
        count: number;
    }[];
}

export default function Home({ popularSkills }: HomeProps) {
    return (
        <>
            <Head title="Home" />
            <AppNavbar variant="home" />
            <main>
                <section id="hero" className="w-full bg-gradient-to-b from-blue-950 to-blue-700">
                    <div className="relative flex h-svh max-h-[900px] min-h-[600px] w-full items-center justify-center overflow-hidden text-center text-white">
                        {/* Background Image & Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
                                alt="Hero background"
                                className="pointer-events-none size-full object-cover object-center opacity-20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-800/50 via-transparent to-blue-950/20"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 container mx-auto flex size-full flex-col items-center justify-center gap-6 px-6">
                            <div className="duration-700 animate-in fade-in slide-in-from-bottom-8">
                                <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] sm:text-6xl">
                                    Kebutuhan Usaha Anda, <br />
                                    Dipenuhi Talenta Lokal
                                </h1>
                                <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100 drop-shadow-md [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
                                    WadahKerja adalah ekosistem yang menghubungkan UMKM dengan para pekerja terverifikasi di dekat Anda untuk
                                    menyelesaikan setiap proyek, besar maupun kecil.
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-4 text-center text-sm font-medium delay-300 duration-700 animate-in fade-in slide-in-from-bottom-8">
                                <Button size="lg" className="transition-transform hover:scale-105 active:scale-100" asChild>
                                    <Link href={route('listings.index')}>
                                        <BriefcaseIcon className="mr-2 h-5 w-5" />
                                        Cari Lowongan
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/50 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 active:scale-100"
                                    asChild
                                >
                                    <Link href={route('talents.index')}>
                                        <UsersIcon className="mr-2 h-5 w-5" />
                                        Cari Talenta
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="w-full bg-blue-50 py-16">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {statistics.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <h3 className="text-3xl font-bold text-blue-900">{stat.number}</h3>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="why" className="relative w-full overflow-hidden bg-white py-24">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                        <div className="h-96 w-96 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
                        <div className="h-96 w-96 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
                    </div>

                    <div className="relative container mx-auto w-full px-4 sm:px-6">
                        <div className="mb-10 text-center sm:mb-16">
                            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-900 sm:mb-4 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                                <StarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                Keunggulan Kami
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-foreground sm:mb-6 sm:text-4xl">
                                Kenapa Memilih <span className="text-blue-900">WadahKerja</span>?
                            </h2>
                            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-xl">
                                Kami bukan sekadar platform. Kami adalah ekosistem yang dirancang khusus untuk mendukung pertumbuhan bisnis lokal dan
                                pengembangan talenta di sekitar Anda.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                            {reasons.map(({ title, Icon, description, features }) => (
                                <div key={title} className="group relative">
                                    {/* Card */}
                                    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:rounded-2xl sm:p-8">
                                        {/* Icon Container */}
                                        <div className="mb-6 inline-flex items-center sm:mb-8">
                                            <div className="relative">
                                                <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-25"></div>
                                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 sm:h-16 sm:w-16">
                                                    <Icon className="size-6 text-white sm:h-8 sm:w-8" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-blue-900 sm:mb-4 sm:text-2xl">
                                            {title}
                                        </h3>
                                        <p className="mb-5 text-sm text-muted-foreground sm:mb-6 sm:text-base">{description}</p>

                                        {/* Feature List */}
                                        <ul className="space-y-2.5 sm:space-y-3">
                                            {features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2 sm:gap-3">
                                                    <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mt-1 sm:h-5 sm:w-5">
                                                        <CheckCircleIcon className="h-2.5 w-2.5 text-blue-900 sm:h-3 sm:w-3" />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground sm:text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Stats */}
                        <div className="mt-12 grid gap-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:mt-20 sm:gap-8 sm:rounded-2xl sm:p-8 md:grid-cols-4">
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-blue-900 sm:mb-2 sm:text-3xl">95%</div>
                                <p className="text-xs text-muted-foreground sm:text-sm">Tingkat Kepuasan UMKM</p>
                            </div>
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-blue-900 sm:mb-2 sm:text-3xl">48 Jam</div>
                                <p className="text-xs text-muted-foreground sm:text-sm">Rata-rata Waktu Pencarian</p>
                            </div>
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-blue-900 sm:mb-2 sm:text-3xl">100%</div>
                                <p className="text-xs text-muted-foreground sm:text-sm">Jaminan Pembayaran</p>
                            </div>
                            <div className="text-center">
                                <div className="mb-1 text-2xl font-bold text-blue-900 sm:mb-2 sm:text-3xl">24/7</div>
                                <p className="text-xs text-muted-foreground sm:text-sm">Dukungan Platform</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-20">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 h-72 w-72 -translate-x-36 -translate-y-36 rounded-full bg-blue-100 opacity-50"></div>
                    <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-48 translate-y-48 rounded-full bg-blue-200 opacity-30"></div>

                    <div className="relative z-10 container mx-auto px-6">
                        <div className="mb-16 text-center">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900">
                                <CheckCircleIcon className="h-4 w-4" />
                                Mudah & Efektif
                            </div>
                            <h2 className="mb-6 text-4xl font-bold text-foreground">
                                Cara Kerja <span className="text-blue-900">WadahKerja</span>
                            </h2>
                            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                                Sistem yang dirancang khusus untuk memudahkan UMKM dan talenta lokal berkolaborasi dengan efisien
                            </p>
                        </div>

                        {/* Process Flow */}
                        <div className="relative">
                            {/* Connection Lines */}
                            <div className="absolute top-24 left-1/2 hidden w-full max-w-4xl -translate-x-1/2 md:block">
                                <svg className="h-8 w-full" viewBox="0 0 800 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Dotted Background Line */}
                                    <path d="M50 16 L750 16" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                                    {/* Animated Progress Line */}
                                    <path
                                        d="M50 16 L750 16"
                                        stroke="url(#gradient)"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        className="animate-[dash_3s_ease-in-out_infinite]"
                                        strokeDasharray="700"
                                        strokeDashoffset="700"
                                    />
                                    {/* Step Circles */}
                                    <circle cx="50" cy="16" r="8" fill="#1e40af" className="animate-pulse" />
                                    <circle cx="400" cy="16" r="8" fill="#1e40af" className="animate-pulse" />
                                    <circle cx="750" cy="16" r="8" fill="#1e40af" className="animate-pulse" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#1e40af">
                                                <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite" />
                                            </stop>
                                            <stop offset="50%" stopColor="#3b82f6">
                                                <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite" />
                                            </stop>
                                            <stop offset="100%" stopColor="#1e40af">
                                                <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite" />
                                            </stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* Mobile Connection Lines */}
                            <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 md:hidden">
                                {/* Background Line */}
                                <div className="h-full w-full rounded-full bg-slate-200"></div>
                                {/* Animated Line */}
                                <div className="absolute top-0 h-full w-full">
                                    <div className="h-full w-full animate-[heightGrow_3s_ease-in-out_infinite] rounded-full bg-gradient-to-b from-blue-900 to-blue-600"></div>
                                </div>
                                {/* Step Circles */}
                                <div className="absolute top-[20%] -translate-x-1/2 translate-y-[-50%]">
                                    <div className="h-4 w-4 animate-pulse rounded-full bg-blue-900"></div>
                                </div>
                                <div className="absolute top-[50%] -translate-x-1/2 translate-y-[-50%]">
                                    <div className="h-4 w-4 animate-pulse rounded-full bg-blue-900"></div>
                                </div>
                                <div className="absolute top-[80%] -translate-x-1/2 translate-y-[-50%]">
                                    <div className="h-4 w-4 animate-pulse rounded-full bg-blue-900"></div>
                                </div>
                            </div>

                            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
                                {howItWorksSteps.map((step, index) => (
                                    <div key={index} className="group relative">
                                        {/* Card */}
                                        <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:border-blue-200 hover:shadow-xl">
                                            {/* Step Number with Icon Background */}
                                            <div className="relative mb-8">
                                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                                                    {step.step}
                                                </div>
                                                {/* Floating badge */}
                                                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                                    <CheckCircleIcon className="h-4 w-4 text-white" />
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <h3 className="mb-4 text-2xl font-bold text-foreground transition-colors group-hover:text-blue-900">
                                                    {step.title}
                                                </h3>
                                                <p className="mb-6 leading-relaxed text-muted-foreground">{step.description}</p>

                                                {/* Enhanced Features */}
                                                <div className="space-y-3">
                                                    <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                                                <BriefcaseIcon className="h-3 w-3 text-white" />
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="text-sm font-medium text-blue-900">Untuk UMKM</p>
                                                                <p className="text-sm text-blue-700">{step.forEmployer}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                                                                <UsersIcon className="h-3 w-3 text-white" />
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="text-sm font-medium text-green-900">Untuk Talenta</p>
                                                                <p className="text-sm text-green-700">{step.forTalent}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Job Categories Section */}
                <section id="categories" className="container mx-auto w-full px-6 py-16">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Kategori Pekerjaan Populer</h2>
                        <p className="text-lg text-muted-foreground">Temukan berbagai kategori pekerjaan yang paling dibutuhkan UMKM</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                        {popularSkills.length > 0 ? (
                            popularSkills.map((skill, index) => {
                                const Icon = skillIconMap[skill.name as keyof typeof skillIconMap] || skillIconMap.default;

                                return (
                                    <Link
                                        key={index}
                                        href={route('listings.index', { skills: skill.id })}
                                        className="group cursor-pointer rounded-lg border border-border p-6 transition-all hover:border-blue-300 hover:shadow-md"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200">
                                                <Icon className="size-6 text-blue-900" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{skill.name}</h3>
                                                <p className="text-sm text-muted-foreground">{skill.count} lowongan tersedia</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="col-span-2 py-8 text-center md:col-span-3">
                                <p className="text-muted-foreground">Belum ada kategori pekerjaan tersedia.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="w-full bg-blue-900 py-16">
                    <div className="container mx-auto px-6">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">Apa Kata Mereka?</h2>
                            <p className="text-lg text-blue-100">Cerita sukses dari komunitas WadahKerja</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="flex h-full flex-col rounded-lg bg-white p-6">
                                    <div className="mb-4 flex items-center gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="mb-6 flex-grow text-muted-foreground italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                            <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="w-full bg-gradient-to-b from-blue-900 to-blue-600 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-white">Siap Memulai Perjalanan Anda?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                            Bergabunglah dengan ribuan UMKM dan talenta lokal yang telah merasakan manfaat ekosistem WadahKerja
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button size="lg" variant="secondary" className="text-blue-900" asChild>
                                <Link href={route('talents.index')}>
                                    Mulai Cari Talenta
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800" asChild>
                                <Link href={route('listings.index')}>
                                    Jelajahi Lowongan
                                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <AppFooter />
        </>
    );
}
