/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTechnicianById } from "../../_actions/getTechnician";
import { notFound } from "next/navigation";
import { Star, MapPin, User, Mail, Phone, Briefcase, Calendar } from "lucide-react";
import React from "react";

export default async function TechnicianByIdPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const response = await getTechnicianById(id);

    if (!response.success || !response.data) {
        notFound();
    }

    const technician = response.data;
    const { user, reviewStats, services, availability } = technician;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Profile Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                        <div className="mx-auto h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <User className="h-12 w-12 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
                            <MapPin className="h-4 w-4" />
                            <span>{technician.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{technician.rating}</span>
                            <span className="text-sm text-gray-500">({reviewStats.totalReviews} reviews)</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            {user.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span>{user.email}</span>
                                </div>
                            )}
                            {user.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span>{user.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* About */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-xl font-bold mb-4">About Me</h2>
                        <p className="text-gray-600">{technician.bio || technician.description || "No description provided."}</p>
                        
                        <div className="mt-6 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                            <span className="font-medium text-gray-700">Experience:</span>
                            <span className="text-gray-600">{technician.experience || "Not specified"}</span>
                        </div>

                        {technician.skills && technician.skills.length > 0 && (
                            <div className="mt-4">
                                <span className="font-medium text-gray-700 block mb-2">Skills:</span>
                                <div className="flex flex-wrap gap-2">
                                    {technician.skills.map((skill: string, index: number) => (
                                        <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Services */}
                    {services && services.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-xl font-bold mb-4">Offered Services</h2>
                            <div className="space-y-4">
                                {services.map((service: any) => (
                                    <div key={service.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{service.title}</h4>
                                            <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-primary">${service.price}</div>
                                            <div className="text-xs text-gray-500">{service.duration} min</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Availability */}
                    {availability && availability.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Availability
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {availability.map((slot: any) => (
                                    <div key={slot.id} className="bg-gray-50 border rounded-lg p-3 text-center">
                                        <div className="font-medium text-gray-900 text-sm">{slot.dayOfWeek}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {new Date(slot.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                                            {new Date(slot.endAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
