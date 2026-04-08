import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from "@/Layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Loader2 } from "lucide-react";

function DestinoInfo() {

    return (
        <div className="w-full h-full p-4 md:p-6 lg:p-8">
           df
        </div>
    );
}

DestinoInfo.layout = (page: React.ReactNode) => (
    <MainLayout title="Places | Hotel Manager" children={page} />
);

export default DestinoInfo;